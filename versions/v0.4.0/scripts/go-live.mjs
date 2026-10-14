#!/usr/bin/env node
// schematize-institutional — o GATE DE GO-LIVE. Antes de apontar o dominio, o site responde a
// estas perguntas por HTTP; nao por opiniao.
//
// Por que existe: a skill descrevia o baseline e nao tinha como PROVAR que ele esta no ar (zero
// scripts, sem gate de go-live — vistoria de 2026-08-21). E os erros que este gate pega sao
// exatamente os que ninguem ve na revisao visual: o `Disallow: /` do staging que viajou, o
// `noindex` esquecido, o soft-404 que devolve 200, o canonical apontando para o dominio de teste.
//
// uso: go-live.mjs <base-url> [--paginas paginas.txt] [--json] [--sem-rede-externa]
//      exit 0 = pode subir · 1 = REPROVA · 2 = uso errado / site inalcancavel
const BASE_PADRAO = [
  '/', '/sobre', '/servicos', '/contato', '/legal', '/legal/termos-de-uso',
  '/legal/termos-de-servico', '/legal/privacidade', '/legal/cookies', '/mapa-do-site',
]

const argv = process.argv.slice(2)
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined }
const base = argv.find(a => !a.startsWith('--'))
if (!base) {
  console.error('uso: go-live.mjs <base-url> [--paginas paginas.txt] [--json]')
  process.exit(2)
}
const raiz = base.replace(/\/$/, '')

async function pegar(caminho, opcoes = {}) {
  const url = caminho.startsWith('http') ? caminho : raiz + caminho
  try {
    const r = await fetch(url, { redirect: 'manual', ...opcoes })
    const corpo = opcoes.method === 'HEAD' ? '' : await r.text()
    return { ok: true, status: r.status, corpo, headers: r.headers, url }
  } catch (e) {
    return { ok: false, erro: e.message, url }
  }
}

const falhas = [], avisos = []
const reprova = (m) => falhas.push(m)

// ------------------------------------------------------------------ 0. o site responde
const home = await pegar('/')
if (!home.ok) { console.error(`✖ ${raiz} inalcancavel: ${home.erro}`); process.exit(2) }
if (home.status >= 300) reprova(`/ responde ${home.status} — a home nao pode redirecionar nem falhar`)

// ------------------------------------------------------------------ 1. paginas do baseline
let paginas = BASE_PADRAO
const arqPaginas = opt('--paginas')
if (arqPaginas) {
  const { readFileSync } = await import('node:fs')
  paginas = readFileSync(arqPaginas, 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))
  if (!paginas.length) { console.error(`✖ ${arqPaginas} sem nenhuma pagina — lista vazia nao e baseline cumprido`); process.exit(2) }
}
const respostas = new Map()
for (const p of paginas) {
  const r = await pegar(p)
  respostas.set(p, r)
  if (!r.ok) { reprova(`${p}: erro de rede (${r.erro})`); continue }
  if (r.status !== 200) reprova(`${p}: ${r.status} — pagina do baseline tem de responder 200`)
}

// ------------------------------------------------------------------ 2. o 404 e um 404 DE VERDADE
// Soft-404 (pagina de erro devolvendo 200) e o defeito que passa na revisao visual: a tela diz
// "nao encontrado" e o crawler indexa como conteudo valido.
const inexistente = `/pagina-que-nao-existe-${'x'.repeat(12)}`
const r404 = await pegar(inexistente)
if (r404.ok) {
  if (r404.status === 200) reprova(`${inexistente} responde 200 com corpo — SOFT-404: a tela diz "nao encontrado" e o crawler indexa como conteudo valido`)
  else if (r404.status !== 404) avisos.push(`caminho inexistente responde ${r404.status} (esperado 404)`)
  if (r404.status === 404 && r404.corpo.trim().length < 200) {
    avisos.push('a pagina 404 esta praticamente vazia — erro sem caminho de volta e beco sem saida (§ pagina de erro)')
  }
  if (r404.status === 404 && !/href=/i.test(r404.corpo)) {
    reprova('a pagina 404 nao tem NENHUM link — o usuario que errou o caminho fica sem saida')
  }
}

// ------------------------------------------------------------------ 3. robots.txt
const robots = await pegar('/robots.txt')
if (!robots.ok || robots.status !== 200) reprova(`/robots.txt: ${robots.ok ? robots.status : robots.erro} — sem robots nao ha go-live`)
else {
  const txt = robots.corpo
  // O classico: o robots do staging viaja para producao e o site inteiro sai do indice.
  const blocos = txt.split(/^\s*user-agent:/im).slice(1)
  for (const b of blocos) {
    const alvo = b.split('\n')[0].trim()
    if ((alvo === '*' || alvo === '') && /^\s*disallow:\s*\/\s*$/im.test(b)) {
      reprova('/robots.txt bloqueia TODO o site para todos os crawlers (`Disallow: /`) — e o robots do staging que viajou')
    }
  }
  if (!/sitemap:\s*https?:\/\//i.test(txt)) avisos.push('/robots.txt nao aponta o Sitemap:')
}

// ------------------------------------------------------------------ 4. sitemap.xml
const sitemap = await pegar('/sitemap.xml')
let urls = []
if (!sitemap.ok || sitemap.status !== 200) reprova(`/sitemap.xml: ${sitemap.ok ? sitemap.status : sitemap.erro}`)
else {
  urls = [...sitemap.corpo.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map(m => m[1])
  if (!urls.length) reprova('/sitemap.xml sem nenhuma <loc> — sitemap vazio nao e "site pequeno", e sitemap quebrado')
  const host = new URL(raiz).host
  for (const u of urls) {
    let x
    try { x = new URL(u) } catch { reprova(`sitemap: URL invalida "${u}"`); continue }
    if (x.protocol !== 'https:' && !raiz.startsWith('http://localhost') && !raiz.startsWith('http://127.')) {
      reprova(`sitemap: ${u} nao e https`)
    }
    if (x.host !== host) reprova(`sitemap: ${u} aponta para outro host (${x.host}) — o sitemap do dominio de teste viajou`)
  }
  // Amostra: toda URL do sitemap tem de responder 200. 404/redirect no sitemap gasta crawl budget
  // e polui o indice.
  for (const u of urls.slice(0, 15)) {
    const r = await pegar(u, { method: 'HEAD' })
    if (r.ok && r.status !== 200) reprova(`sitemap: ${u} responde ${r.status} — so entra no sitemap o que responde 200`)
  }
}

// ------------------------------------------------------------------ 5. por pagina: o basico de indexacao
const titulos = new Map()
for (const [p, r] of respostas) {
  if (!r.ok || r.status !== 200) continue
  const html = r.corpo
  const titulo = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim()
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [, ''])[1]
  const robotsMeta = (html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i) || [, ''])[1]
  const desc = (html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) || [, ''])[1]

  if (!titulo) reprova(`${p}: sem <title>`)
  else if (titulos.has(titulo)) reprova(`${p}: <title> duplicado com ${titulos.get(titulo)} — titulo repetido e canibalizacao dentro do proprio site`)
  else titulos.set(titulo, p)
  if (h1s === 0) reprova(`${p}: sem <h1>`)
  else if (h1s > 1) avisos.push(`${p}: ${h1s} <h1> na mesma pagina`)
  if (!desc) avisos.push(`${p}: sem meta description`)
  // Rich results mortos (schematize-seo -> references/dados-estruturados.md): a marcacao sai, o conteudo fica.
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    const t = m[1]
    const morto = /"@type"\s*:\s*"(FAQPage|HowTo)"/.test(t) ? t.match(/"(FAQPage|HowTo)"/)[1] : (/"@type"\s*:\s*"SearchAction"/.test(t) ? 'SearchAction' : null)
    if (morto) reprova(`${p}: JSON-LD ${morto} — rich result morto; mantenha o conteudo visivel e remova a marcacao (schematize-seo)`)
  }
  // O `noindex` do staging em producao tira a pagina do indice em silencio.
  if (/noindex/i.test(robotsMeta)) reprova(`${p}: meta robots com NOINDEX — pagina do baseline nao pode nascer fora do indice`)
  if (!canonical) reprova(`${p}: sem <link rel="canonical">`)
  else {
    let c
    try { c = new URL(canonical, raiz) } catch { reprova(`${p}: canonical invalido (${canonical})`); continue }
    if (c.host !== new URL(raiz).host) reprova(`${p}: canonical aponta para outro host (${c.host}) — canonical cruzado entre dominios da casa e VETADO`)
    else if (c.pathname.replace(/\/$/, '') !== (p === '/' ? '' : p.replace(/\/$/, ''))) {
      reprova(`${p}: canonical nao e self (aponta para ${c.pathname})`)
    }
  }
  if (urls.length) {
    const noSitemap = urls.some(u => { try { return new URL(u).pathname.replace(/\/$/, '') === (p === '/' ? '' : p.replace(/\/$/, '')) } catch { return false } })
    if (!noSitemap) reprova(`${p}: pagina do baseline FORA do sitemap`)
  }
  if (/(src|href)=["']http:\/\//i.test(html) && raiz.startsWith('https')) {
    avisos.push(`${p}: recurso em http:// numa pagina https (conteudo misto)`)
  }
}

// ------------------------------------------------------------------ saida
const veredito = falhas.length ? 'reprovado' : 'aprovado'
if (argv.includes('--json')) {
  console.log(JSON.stringify({ veredito, base: raiz, paginas: paginas.length, urls_no_sitemap: urls.length, falhas, avisos }, null, 2))
} else {
  avisos.forEach(a => console.error(`  ! ${a}`))
  if (falhas.length) {
    console.error(`\n✖ GO-LIVE REPROVADO — ${falhas.length} bloqueio(s):`)
    falhas.forEach(f => console.error(`  · ${f}`))
  } else {
    console.log(`✔ go-live: ${paginas.length} pagina(s) do baseline em 200, 404 de verdade, robots e sitemap coerentes (${urls.length} URL(s)).`)
  }
}
process.exit(falhas.length ? 1 : 0)

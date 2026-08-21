# Sitemap.xml + robots.txt + hreflang — o Essencial pra Nascer Indexável

> **PISO: o sitemap é AUTOGERADO, nunca escrito à mão.** É MUST na `schematize-seo`
> (`references/tecnico.md`) e na `schematize-web` (`references/seo-i18n.md` §46.3), e vale aqui
> igual: sitemap à mão **envelhece na primeira página nova** e passa a mentir para o crawler —
> pior que não ter. Esta skill define **o que entra** (o inventário de páginas); a **geração** é do
> frontend (rota `/sitemap.xml` no App Router / integração do Astro).
>
> Parte da skill **schematize-institutional**. Diz **o que entra** no `sitemap.xml`, no `robots.txt` e
> os `hreflang` **a partir do inventário de páginas** (`arquitetura-informacao.md`), com canonical
> **self** por página — o **mínimo** pra o site institucional **nascer rastreável e indexável**. O
> **SEO técnico fino** (sitemaps em escala, index bloat, log analysis, estratégia multi-domínio,
> hreflang recíproco em grande escala) é da **schematize-seo**; a **geração autogerada em runtime**
> (rota `/sitemap.xml` no App Router/Astro, `robots.ts`, `metadata.alternates`) é da
> **schematize-web**. Aqui é o **kit de partida**.

Convenção: **MUST** = regra; **VETADO** = piso.

---

## Princípio: o sitemap SAI do inventário

O `sitemap.xml` **não** é escrito à mão página a página — ele é **derivado do inventário**. Toda URL
pública e indexável do inventário (`arquitetura-informacao.md`) entra; o que é `noindex` **não**
entra. Fonte única: o inventário → o sitemap. Se a página existe e deve rankear, está no sitemap; se
está no sitemap, existe e responde 200.

**MUST**
- Toda URL do sitemap é **absoluta**, **canônica** (a versão self-canonical: https, com/sem www
  decidido, sem parâmetro de tracking) e retorna **200**.
- Só entram páginas **indexáveis**. `noindex`, redirects (3xx), erros (4xx/5xx) e páginas
  bloqueadas por robots **não** entram.
- Cada página do sitemap é **self-canonical** (`<link rel="canonical" href="ela mesma">`).

**VETADO**
- Sitemap com URL que dá 404/redirect/`noindex` (polui o índice, gasta crawl budget).
- Canonical **cruzado** entre domínios distintos da casa (piso da `schematize-seo`).

---

## O que fica FORA do sitemap (e vira `noindex`)

| Página | Por quê |
|---|---|
| `/obrigado`, `/contato/sucesso` | página de confirmação pós-formulário |
| Resultados de busca interna (`/busca?q=`) | conteúdo infinito/thin |
| Área logada, painel, checkout | privado |
| Staging/preview | não é produção |
| Filtros/paginação com parâmetros | duplicação (canonical pro pai) |
| Vaga fechada, oferta expirada | conteúdo morto |

Essas páginas levam `<meta name="robots" content="noindex,follow">` e ficam de fora do sitemap.

---

## sitemap.xml — estrutura

Um sitemap simples para site institucional (até 50.000 URLs / 50 MB — acima disso, sitemap index):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://exemplo.com.br/</loc>
    <lastmod>2026-01-01</lastmod>
  </url>
  <url>
    <loc>https://exemplo.com.br/sobre</loc>
    <lastmod>2026-01-01</lastmod>
  </url>
  <url>
    <loc>https://exemplo.com.br/servicos</loc>
    <lastmod>2026-01-01</lastmod>
  </url>
  <url>
    <loc>https://exemplo.com.br/servicos/consultoria</loc>
    <lastmod>2026-01-01</lastmod>
  </url>
  <url>
    <loc>https://exemplo.com.br/legal/privacidade</loc>
    <lastmod>2026-01-01</lastmod>
  </url>
  <!-- ... uma <url> por página indexável do inventário ... -->
</urlset>
```

**MUST** — `lastmod` real (data da última mudança de conteúdo, não a data do build). `changefreq` e
`priority` são **ignorados** pelo Google — pode omitir (não são sinal de ranking).

**Multi-idioma:** cada URL de idioma é uma `<url>` própria, com os `xhtml:link` de hreflang (abaixo).

---

## robots.txt

Aponta o sitemap e libera o rastreamento do que deve indexar; bloqueia só o que é privado/inútil.

```
User-agent: *
Allow: /
Disallow: /busca
Disallow: /obrigado
Disallow: /painel/

Sitemap: https://exemplo.com.br/sitemap.xml
```

**MUST**
- Declarar a linha `Sitemap:` com URL **absoluta**.
- **Não** bloquear com `Disallow` o que deveria indexar (erro clássico que some com o site da busca).
- `Disallow` **não** é `noindex`: para tirar do índice, use a meta `noindex` (a página precisa ser
  rastreável pro Google **ver** o `noindex`) — não bloqueie no robots o que quer desindexar.

**VETADO** — `Disallow: /` em produção (bloqueia o site inteiro). Isso é para staging apenas.

---

## Canonical self (por página)

**MUST** — toda página indexável declara `rel=canonical` **para si mesma**, URL absoluta e única:

```html
<link rel="canonical" href="https://exemplo.com.br/servicos/consultoria" />
```

Uma versão canônica do host (decidir https + com/sem www e redirecionar as outras com 301). Sem
parâmetros de tracking na canônica. **Nunca** canonicalizar uma página da casa para outro domínio da
casa (piso `schematize-seo`).

---

## hreflang (se multi-idioma)

Quando o site tem mais de um idioma, cada página declara **todas** as suas versões de idioma
(incluindo a si mesma) e um `x-default`. Os apontamentos são **recíprocos** (A→B exige B→A).

No `<head>` de cada página (ex.: a versão pt de `/sobre`):

```html
<link rel="alternate" hreflang="pt-BR" href="https://exemplo.com.br/sobre" />
<link rel="alternate" hreflang="en"    href="https://exemplo.com.br/en/about" />
<link rel="alternate" hreflang="x-default" href="https://exemplo.com.br/sobre" />
```

Ou dentro do sitemap (equivalente, bom pra escala):

```xml
<url>
  <loc>https://exemplo.com.br/sobre</loc>
  <xhtml:link rel="alternate" hreflang="pt-BR" href="https://exemplo.com.br/sobre"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://exemplo.com.br/en/about"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://exemplo.com.br/sobre"/>
</url>
```
(o `urlset` precisa do namespace `xmlns:xhtml="http://www.w3.org/1999/xhtml"`.)

**MUST** — hreflang **recíproco e completo** (todo conjunto lista todas as alternativas + `x-default`);
código de idioma/região válido (`pt-BR`, `en`, `es`). hreflang quebrado é ignorado. A estratégia
**multi-domínio** (net/org/me/com.br) e o hreflang **em escala** são da `schematize-seo`.

---

## Como o `/institutional-scaffold` gera isso

A partir do input (nome, serviços, idiomas, e-commerce?, endereço?), o scaffold:
1. Monta o **inventário** (baseline + escolhidas) → lista de rotas.
2. Deriva o **sitemap.xml** (uma `<url>` por rota indexável; hreflang se multi-idioma).
3. Escreve o **robots.txt** (allow + disallow do que é `noindex` + linha `Sitemap:`).
4. Marca cada rota com **canonical self**.
5. Grava os arquivos e a lista de `noindex` no `<projeto>_archive/`.

A **rota autogerada em runtime** (Next `app/sitemap.ts` + `app/robots.ts`, Astro `@astrojs/sitemap`)
é implementação → **schematize-web**. O scaffold entrega o **conteúdo/estrutura** desses arquivos.

---

## Checklist (indexabilidade de partida)

- [ ] `sitemap.xml` derivado do inventário: só URLs 200, absolutas, canônicas, indexáveis.
- [ ] `robots.txt` com `Sitemap:` absoluto; **nada** que deveria indexar sob `Disallow`; sem
      `Disallow: /` em produção.
- [ ] Páginas de confirmação/busca/privadas com `noindex` e **fora** do sitemap.
- [ ] Canonical **self** em toda página indexável; uma versão de host (https + www decidido, 301 no resto).
- [ ] hreflang recíproco + `x-default` **se** multi-idioma; códigos válidos.
- [ ] Nenhum canonical cruzado entre domínios da casa.
- [ ] Arquivos + lista de `noindex` gravados no archive.
- [ ] SEO técnico fino (escala, log, multi-domínio, GSC) encaminhado à `schematize-seo`; geração em
      runtime à `schematize-web`.

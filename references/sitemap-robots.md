# Sitemap + robots + canonical — o essencial pra nascer indexável

> Parte da skill **schematize-institutional**. Aqui fica só o **específico do institucional**: o
> sitemap **sai do inventário de páginas** (`arquitetura-informacao.md`). A disciplina de SEO técnico
> (sitemaps em escala, robots, canonical, hreflang, index bloat, multi-domínio) é da
> **`schematize-seo → references/tecnico.md`** (e `internacional-multidominio.md`); a **geração em
> runtime** (`app/sitemap.ts`, `robots.ts`, `@astrojs/sitemap`) é da **schematize-web**.

**PISO:** o sitemap é **autogerado, nunca escrito à mão** (envelhece na primeira página nova).

## O sitemap sai do inventário

Fonte única: inventário → sitemap. Toda URL pública e indexável do inventário entra; `noindex` não.
Se a página existe e deve rankear, está no sitemap; se está no sitemap, existe e responde 200.

**MUST** — URL absoluta, canônica (https, host decidido, sem tracking), 200, self-canonical, `lastmod`
real. **VETADO** — URL 404/redirect/`noindex` no sitemap; canonical cruzado entre domínios da casa.

## O que fica FORA (e vira `noindex`)

| Página | Por quê |
|---|---|
| `/obrigado`, `/contato/sucesso` | confirmação pós-formulário |
| Busca interna (`/busca?q=`) | conteúdo infinito/thin |
| Área logada, painel, checkout | privado |
| Staging/preview | não é produção |
| Filtros/paginação com parâmetros | duplicação (canonical pro pai) |
| Vaga fechada, oferta expirada | conteúdo morto |

Levam `<meta name="robots" content="noindex,follow">` e ficam fora do sitemap. No `robots.txt`
(`Allow: /`, `Disallow` só do privado/inútil, `Sitemap:` absoluto) **VETADO** `Disallow: /` em
produção — e `Disallow` não é `noindex` (o crawler precisa ler a meta).

## hreflang

Só entre **a mesma página traduzida** (pt-BR ↔ en da mesma propriedade), recíproco, com `x-default`.
Os quatro domínios da casa **não são traduções um do outro**: entre eles, só com tradução 1:1 real;
na dúvida, **não declare**. Detalhes: `schematize-seo → references/internacional-multidominio.md`.

## Como o `/institutional-scaffold` gera isso

1. Monta o inventário (baseline + escolhidas) → rotas. 2. Deriva o sitemap (uma `<url>` por rota
indexável). 3. Escreve o robots (allow + disallow do `noindex` + `Sitemap:`). 4. Marca canonical
self por rota. 5. Grava arquivos e lista de `noindex` no `<projeto>_archive/`. O gate
`scripts/go-live.mjs` prova no ar: robots sem `Disallow: /`, sitemap coerente, 404 de verdade.

## Checklist

- [ ] `sitemap.xml` derivado do inventário: só URLs 200, absolutas, canônicas, indexáveis.
- [ ] `robots.txt` com `Sitemap:` absoluto; sem `Disallow: /` em produção.
- [ ] Confirmação/busca/privadas com `noindex` e fora do sitemap.
- [ ] Canonical self em toda indexável; nenhum canonical cruzado entre domínios da casa.
- [ ] hreflang recíproco + `x-default` **se** multi-idioma.
- [ ] SEO técnico fino à `schematize-seo`; geração em runtime à `schematize-web`.

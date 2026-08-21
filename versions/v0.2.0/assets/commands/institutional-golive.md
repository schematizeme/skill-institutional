---
description: schematize-institutional — o gate de go-live: prova por HTTP que o baseline está no ar (200), que o 404 é 404 de verdade, e que robots/sitemap/canonical não trouxeram o staging junto
argument-hint: "<url-base> (ex.: https://staging.exemplo.com)"
---

# /institutional-golive — antes de apontar o domínio

Este comando responde por **HTTP**, não por opinião. Os erros que ele pega são exatamente os que
**não aparecem na revisão visual**: o `Disallow: /` do staging que viajou, o `noindex` esquecido, o
soft-404 que devolve 200, o canonical apontando para o domínio de teste.

```bash
node .claude/skills/schematize-institutional/scripts/go-live.mjs https://staging.exemplo.com
```

| Exit | Significado |
|---|---|
| `0` | pode subir |
| `1` | **reprova** — cada linha é um bloqueio |
| `2` | uso errado ou **site inalcançável** (que não é aprovação) |

## O que reprova

**Baseline:** qualquer página do inventário fora do `200`. (Use `--paginas paginas.txt` para a lista
real do site; a lista embutida é o baseline padrão. Arquivo **vazio** sai `2` — lista vazia não é
baseline cumprido.)

**Erro:** **soft-404** (página de erro respondendo `200`) · 404 **sem nenhum link** de volta.

**robots.txt:** ausente · `Disallow: /` para `User-agent: *` — o robots do staging que viajou e tira
o site inteiro do índice.

**sitemap.xml:** ausente · **vazio** (não é "site pequeno", é sitemap quebrado) · URL que não
responde `200` · URL de **outro host** (o sitemap do domínio de teste viajou) · página do baseline
**fora** do sitemap.

**Por página:** sem `<title>` · **`<title>` duplicado** (canibalização dentro do próprio site) · sem
`<h1>` · **`noindex`** numa página do baseline · sem canonical · canonical que não é *self* ·
**canonical cruzado entre domínios da casa** (VETADO pela `schematize-seo`).

## Rode o vermelho dele antes de confiar

```bash
bash .claude/skills/schematize-institutional/scripts/go-live.test.sh
```

17 casos contra um site falso servido **de verdade por HTTP** (não mock) — 15 deles quebrados de
propósito.

## Depois do verde

O gate cobre o que é **verificável por máquina**. Continuam sendo humanos: conteúdo real (nada de
número, depoimento ou prêmio inventado — o `[REVISAR: negócio]` de `conteudo-paginas.md`), as
páginas legais com data de vigência, e a revisão de a11y da `schematize-web`.

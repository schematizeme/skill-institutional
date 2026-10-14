---
description: schematize-institutional — gera a ESTRUTURA de um site institucional (inventário de páginas + templates de conteúdo + JSON-LD por tipo + sitemap.xml/robots.txt) a partir de um input mínimo (nome da empresa, serviços, idiomas)
argument-hint: "[nome da empresa, ex: Acme]"
---

Gere a **estrutura completa de um site institucional** para ${ARGUMENTS:-<empresa>}. **Plan-first:**
fixe o inventário **antes** de escrever página. Leia primeiro `references/arquitetura-informacao.md`,
`references/paginas-legais.md`, `references/dados-estruturados.md` e `references/sitemap-robots.md`.

## Passo 0 — Colher o input mínimo (sem travar)

**Não pare para perguntar.** A regra do overdev (`schematize-engineering` -> `references/overdev.md`)
vale aqui: pergunta que bloqueia vira **item parkeado**, e o trabalho segue. Na prática:

1. **Use o que já dá para descobrir** — repo, README, domínio, conteúdo existente, `.env.example`.
2. **Para o que faltar, assuma o default seguro e MARQUE**: gere o artefato com
   `[REVISAR: negócio]` no ponto exato, e registre o item como `- [H ]` no checklist de saída (é
   humano: só o dono do site sabe o CNPJ, se vende no site, se tem endereço).
3. **Só então**, ao fim do passo, liste de uma vez o que precisa de confirmação — em bloco, não uma
   pergunta por vez.

Um scaffold que trava na primeira pergunta entrega **nada**; um que assume o default seguro e marca
o ponto entrega um site inteiro com cinco lugares para revisar. O erro a evitar não é assumir — é
assumir **em silêncio**.

Os pontos de input (colha do que existir; o que faltar vira `[REVISAR: negócio]`):
- **Nome da empresa** (= `${ARGUMENTS}`), **razão social/CNPJ** e **domínio** (pra URLs absolutas).
- **Serviços/produtos** (lista) — cada um vira uma página de detalhe.
- **Idiomas** (ex.: só pt-BR, ou pt-BR + en) — decide hreflang/i18n.
- **É e-commerce / vende no site?** (decide Devolução/Frete/Estorno) e **envia produto físico?**
  (decide Frete).
- **Tem endereço físico / atendimento presencial?** (decide `/onde-estamos` + `LocalBusiness`).
- Opcionais desejados: Blog, FAQ, Carreiras, Cases, Parceiros, Imprensa, Acessibilidade.

## Passo 1 — Inventário de páginas (`references/arquitetura-informacao.md`)
- Monte o **baseline obrigatório**: Home, Sobre, Serviços (índice + 1 detalhe por serviço), Legal
  (índice + subpáginas aplicáveis), Contato, Mapa do site, sitemap.xml, robots.txt.
- **Legais:** sempre Termos de uso, Termos de serviço, Privacidade, Cookies; adicione
  Devolução/Frete/Estorno **se** vende/envia (matriz em `paginas-legais.md`).
- Some as **recomendadas/opcionais** escolhidas por fit. Não inflar com thin.
- Entregue a **árvore de URLs** e a definição de **menu** (hubs) e **rodapé** (institucional +
  todas as legais + contato). ≤3 cliques, self-canonical, URLs legíveis.

## Passo 2 — Templates de conteúdo (`references/conteudo-paginas.md`)
- Para cada página do inventário, gere o **esqueleto de conteúdo** (blocos + checklist). O que
  depender de dado real e não foi fornecido sai como `[REVISAR: negócio: <o quê>]` — **nunca**
  invente número/depoimento/certificação.

## Passo 3 — Páginas legais como SCAFFOLD (`references/paginas-legais.md`)
- Gere as legais como **estrutura + placeholders + pontos obrigatórios**. **Deixe explícito que NÃO
  é aconselhamento jurídico**; marque os pontos jurídicos com `[REVISAR: advogado]`.
- Privacidade **precisa** cobrir os pontos LGPD (controlador, encarregado/DPO, dados, finalidade,
  base legal, compartilhamento, retenção, direitos + como exercer). Cookies **precisa** de
  categorias + consentimento opt-in dos não-essenciais.

## Passo 4 — Dados estruturados / JSON-LD (`references/dados-estruturados.md`)
- Gere os blocos por página: `Organization` (compartilhado, por `@id`) + `WebSite` na
  Home; `BreadcrumbList` em toda página com hierarquia; `Service`/`Product` no detalhe;
  `LocalBusiness` se há endereço; `ContactPage`/`ContactPoint` no Contato; `Article` no blog. Todo campo do markup **existe visível** na página.

## Passo 5 — Sitemap + robots + hreflang (`references/sitemap-robots.md`)
- Derive o **sitemap.xml** do inventário (só URLs indexáveis, absolutas, canônicas, 200).
- Escreva o **robots.txt** (allow + disallow do que é `noindex` + `Sitemap:` absoluto).
- Marque cada página com **canonical self**; se multi-idioma, gere **hreflang recíproco + x-default**.
- Liste o que fica **`noindex`** (obrigado/busca/privado).

## Passo 6 — Gravar e delegar
- Grave inventário + templates + JSON-LD + sitemap/robots no **`<projeto>_archive/`** (o rastro).
- **Delegue:** a implementação no front (Next/Astro, RSC, a11y, CWV, i18n em runtime, injeção do
  JSON-LD, `app/sitemap.ts`) → **`schematize-web`** (`/web-*`); a estratégia de SEO (keywords,
  on-page fino, multi-domínio, AIO, medição) → **`schematize-seo`** (`/seo-*`).

## Piso (VETADO)
Conteúdo legal é **scaffold, não aconselhamento jurídico** (`[REVISAR: advogado]`, revisão por
advogado antes de publicar). Baseline institucional **obrigatório** (não fecha sem Home/Sobre/
Serviços/Legal/Contato/sitemap). Toda página **self-canonical**, uma intenção, no sitemap. JSON-LD
**reflete o visível** (nada de FAQ oculto/avaliação inventada). **Ícones, nunca emoji.** Não recode
o front nem refaça o plano de SEO aqui — **delegue**.

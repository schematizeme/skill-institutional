---
name: schematize-institutional
metadata:
  version: 0.2.0
description: Site institucional da casa — o inventário de páginas que um site de empresa precisa ter, o conteúdo mínimo de cada uma, e o piso legal/LGPD. Cobre a arquitetura de páginas (home, sobre, produtos/serviços, casos, preços, blog, contato, carreiras, imprensa, status), o que cada página tem de provar (proposta clara, prova social honesta, CTA único, dados de contato reais), as páginas LEGAIS obrigatórias (termos de uso e de serviço, política de privacidade LGPD, cookies, devolução/frete/estorno quando há venda), o encarregado/DPO e os direitos do titular, e o piso de acessibilidade e SEO de cada template. Use SEMPRE que for planejar, criar, revisar ou auditar um site institucional, uma landing de empresa, uma página legal ou o inventário de páginas de um domínio — mesmo sem citar "institucional". AVISO: o conteúdo legal aqui é SCAFFOLD, não texto jurídico válido — o item de revisão por advogado é humano e não se marca sozinho. Engenharia de front: schematize-web; rankeamento: schematize-seo.
---

# Construção de Sites Institucionais da Casa (schematize-institutional)

Disciplina normativa **agnóstica de stack** que responde a uma pergunta só: **quais páginas um
site institucional precisa ter, o que cada uma precisa dizer, e como ela nasce indexável?** A
resposta não é "uma home e uma página de contato" — é um **inventário completo** (com as páginas
legais que quase todo mundo esquece), um **template de conteúdo por página**, os **dados
estruturados** certos por tipo de página, e o **sitemap/robots** gerados a partir desse inventário.

É a camada de **estrutura e conteúdo** do site institucional. Ela **não** coda o frontend e **não**
faz a estratégia de SEO — ela **delega**:

- **Como implementar** (Next.js/Astro, RSC, fronteira client/server, a11y WCAG 2.2 AA, Core Web
  Vitals, build, deploy, i18n com URL por idioma, sitemap autogerado em runtime, injeção do
  JSON-LD no `<head>`) → **schematize-web**.
- **Como rankear e ser encontrado** (SEO técnico fino, pesquisa de keywords, on-page, topic
  clusters, multi-domínio sem canibalização, hreflang recíproco em escala, AIO/LLMO/GEO,
  autoridade/E-E-A-T, medição/GSC) → **schematize-seo**.

Esta skill entrega o **mapa do prédio e a lista do que vai em cada sala**; a **web** constrói as
salas; a **seo** faz o prédio aparecer no mapa da cidade.

**Versão:** skill `schematize-institutional` v0.2.0. Changelog em `CHANGELOG.md`.

## Comandos (Claude Code)

Digite `/institutional-help` pra ver todos. Em resumo:

| Comando | O que faz |
|---|---|
| `/institutional-help` | lista todos os comandos do schematize-institutional |
| `/institutional-scaffold` | a partir de um **input mínimo** (nome da empresa, serviços/produtos, idiomas, tem endereço físico? é e-commerce?) gera o **inventário de páginas** (baseline + opcionais), os **templates de conteúdo** por página, os blocos **JSON-LD** por tipo e o **sitemap.xml + robots.txt** (+ hreflang se multi-idioma) — e grava no archive |
| `/institutional-golive` | **o gate de go-live**: prova por HTTP que o baseline está no ar, que o 404 é 404 de verdade e que robots/sitemap/canonical não trouxeram o staging junto |
| `/institutional-load` | carrega à força TODO o corpo normativo (IA/inventário, conteúdo, legais, dados estruturados, sitemap) e passa a aplicá-lo |
| `/institutional-claude` | cria ou mescla o `CLAUDE.md` sempre-on do institucional na raiz do repo |
| `/institutional-cc` | context compact: gera handoff no archive e roda `/compact` |
| `/institutional-handoff` | gera o handoff (context.md + checklist.md) sem compactar |

Os comandos ficam em `assets/commands/` e são instalados em `.claude/commands/`.

## Como usar esta skill

1. **Plan-first: fixe o inventário antes de gerar página.** Rode `/institutional-scaffold` (ou leia
   `references/arquitetura-informacao.md`) e decida **quais** páginas o site terá (baseline
   obrigatório + as recomendadas/opcionais por fit), a **hierarquia de URL** e a estrutura de
   Serviços (índice → detalhe) e de Legal (índice → 7 subpáginas). Site institucional sem
   inventário nasce com buraco (falta a página de privacidade, falta o índice legal).
2. **Preencha o conteúdo por template** (`references/conteudo-paginas.md`): cada página tem um
   checklist do que precisa ter. As **páginas legais** entram como **SCAFFOLD**
   (`references/paginas-legais.md`): estrutura + placeholders + pontos obrigatórios (LGPD) — **não
   é aconselhamento jurídico**, o texto final é **revisado por advogado** antes de publicar.
3. **Marque os dados estruturados** por tipo de página (`references/dados-estruturados.md`):
   Organization + WebSite no site, BreadcrumbList em toda página com hierarquia, Service/Product no
   detalhe de serviço, FAQPage na FAQ (só se visível), LocalBusiness se houver endereço,
   Article/BlogPosting no blog. O JSON-LD reflete o conteúdo **visível**.
4. **Gere o sitemap/robots** a partir do inventário (`references/sitemap-robots.md`): toda URL
   pública no `sitemap.xml`, `robots.txt` apontando o sitemap, canonical **self** por página,
   hreflang recíproco se multi-idioma. O site precisa **nascer rastreável e indexável**.
5. **Delegue o resto.** Implementação no front → `schematize-web` (rode `/web-*`). Estratégia de
   SEO (keywords, multi-domínio, AIO, medição) → `schematize-seo` (rode `/seo-*`). **Não** recode o
   front aqui nem substitua o plano de SEO — esta skill entrega estrutura e conteúdo padrão.
6. **Não trabalhe de memória** — o inventário, os templates, os blocos legais e os JSON-LD estão
   nos references. Ao terminar, grave o inventário + JSON-LD + sitemap no `<projeto>_archive/`.

Mapa de references — leia o que casa com a tarefa:

| Tarefa | Reference |
|---|---|
| **Arquitetura de informação / inventário de páginas**: as páginas baseline (Home, Sobre, Serviços índice+detalhe, Legal índice+7 subpáginas, Contato) e as recomendadas/opcionais (FAQ, Blog, Carreiras, Localização, Depoimentos, Parceiros, Imprensa, Acessibilidade, Mapa do site), hierarquia de URL, navegação/menu/rodapé, baseline vs opcional | `references/arquitetura-informacao.md` |
| **Templates/checklists de conteúdo** por página: o que cada página precisa ter (Home, Sobre, Serviço índice/detalhe, Contato, FAQ, Blog, Carreiras, Localização…) | `references/conteudo-paginas.md` |
| **Páginas legais como SCAFFOLD** (NÃO é aconselhamento jurídico): estrutura + placeholders + pontos obrigatórios de cada uma das 7 (Termos de uso, Termos de serviço, Privacidade, Cookies, Devolução, Frete, Estorno/Reembolso), com a base LGPD na privacidade/cookies | `references/paginas-legais.md` |
| **Dados estruturados (schema.org/JSON-LD) por tipo de página**: Organization + WebSite (SearchAction), BreadcrumbList, LocalBusiness, Service/Product, FAQPage, ContactPoint, Article/BlogPosting — blocos de referência prontos | `references/dados-estruturados.md` |
| **Sitemap.xml + robots.txt + hreflang** gerados a partir do inventário, canonical self, o essencial pra nascer indexável (o SEO fino remete à schematize-seo) | `references/sitemap-robots.md` |

## Pisos inegociáveis (vetam o atalho)

Independente do reference, estes limites nunca são cruzados:

1. **Conteúdo legal é SCAFFOLD, não aconselhamento jurídico.** Esta skill provê a **estrutura** das
   páginas legais (seções, placeholders, pontos obrigatórios), **nunca** o texto jurídico final
   como se fosse válido. Todo texto legal sai marcado `[REVISAR: advogado]` e **exige revisão por
   um(a) advogado(a)** antes de publicar. **VETADO** apresentar minuta legal como pronta para
   produção. A responsabilidade jurídica é do dono do site, não da skill.
2. **Privacidade e cookies só fecham com os pontos de LGPD.** A Política de Privacidade precisa de:
   quem é o **controlador** + contato do **encarregado/DPO**, **quais** dados são coletados, para
   **qual finalidade** e sob **qual base legal** (art. 7º LGPD), **compartilhamento**, **retenção**,
   **direitos do titular** (art. 18) e **como exercê-los**. A Política de Cookies precisa de:
   categorias de cookies, finalidade, e **consentimento opt-in** para os não-essenciais (banner que
   **não** dispara não-essenciais antes do aceite). Sem esses pontos, a página **não** é marcada
   como pronta. (Ainda assim, ver piso 1: revisão jurídica obrigatória.)
3. **O baseline institucional é obrigatório.** Nenhum site institucional da casa nasce sem: **Home**,
   **Quem somos/Sobre**, **Serviços/Produtos** (índice + detalhe por serviço), **Legal** (índice +
   as subpáginas legais aplicáveis), **Contato**, **sitemap.xml + robots.txt** e um **Mapa do site**
   (HTML). Faltou uma → o scaffold **não** fecha. As demais páginas entram por fit (ver
   `arquitetura-informacao.md`).
4. **Toda página é self-canonical, com UMA intenção, e nasce rastreável.** Cada página pública tem
   `rel=canonical` para si mesma (URL absoluta), responde a **uma** intenção, e está no
   `sitemap.xml`; o que não deve indexar (staging, obrigado/thank-you, resultados de busca interna)
   é `noindex` de propósito. A disciplina fina é da `schematize-seo`, mas o resultado é **exigido**
   aqui: o site institucional **nasce indexável**.
5. **JSON-LD reflete o conteúdo VISÍVEL.** Cada página com tipo aplicável carrega o JSON-LD certo
   (Organization/WebSite/BreadcrumbList/Service/Product/FAQPage/LocalBusiness/Article), e **nunca**
   marca rich result que a página não mostra (FAQ oculto, avaliação inventada, endereço que não
   existe). Marcar o que não está na tela vira **ação manual** e derruba o domínio (ver
   `dados-estruturados.md` e a `schematize-seo`).
6. **Estrutura ≠ engenharia ≠ SEO — delegue.** Esta skill entrega **o mapa e o conteúdo padrão**.
   **Como codar** (Next/Astro, RSC, a11y, CWV, build, i18n em runtime, sitemap autogerado) é da
   **schematize-web**. **Como rankear** (keywords, on-page, multi-domínio sem canibalização,
   hreflang em escala, AIO, medição) é da **schematize-seo**. **VETADO** reimplementar o front ou
   refazer o plano de SEO aqui — chame a skill dona.
7. **Ícones, nunca emoji, na estrutura do site.** A navegação, os cards, os títulos e o rodapé
   usam **ícones** (SVG/lib de ícones), **nunca emoji**, salvo pedido explícito. Padrão de refino
   visual e de UI é da `schematize-web`.
8. **Archive obrigatório.** O inventário de páginas, os templates de conteúdo, os blocos JSON-LD e o
   sitemap/robots gerados vão para o `<projeto>_archive/` (o rastro que a auditoria consome). Sem
   archive, a entrega não aconteceu.

## Relação com as outras skills

- **schematize-web** — a **engenharia de frontend**. Esta skill diz *quais páginas, com qual
  conteúdo e qual JSON-LD*; o web diz *como codar* (App Router/RSC, `metadata`, sitemap autogerado
  em runtime, injeção do JSON-LD no `<head>`, i18n com URL por idioma, a11y AA, Core Web Vitals,
  build, deploy). Há sobreposição proposital em dados estruturados e sitemap: aqui é o **kit
  institucional mínimo** (o inventário e os blocos prontos); lá é a **implementação**.
- **schematize-seo** — a **disciplina de SEO**. Esta skill garante que o site **nasce indexável**
  (canonical self, sitemap do inventário, robots, JSON-LD válido); a `schematize-seo` é a fonte
  canônica de *como rankear* — keywords/intenção, on-page fino, multi-domínio sem canibalização
  (net/org/me/com.br), hreflang recíproco em escala, AIO/LLMO/GEO, autoridade e medição. O detalhe
  fino de SEO **sempre** remete a ela.
- **schematize-scaffold** — o **projeto novo da casa** (piso do dia 0: repos por contexto, IAM
  app-separada, ops, CI gated). O site institucional em si é um `<projeto>_front` (ou site próprio)
  que herda esse piso; esta skill preenche o **conteúdo e a estrutura** desse front.
- **schematize-docs** — quando o site institucional precisa de docs/ADR do próprio conteúdo
  (decisão de arquitetura de informação vira ADR; o inventário é doc-as-code no archive).
- **schematize-engineering** — a **BASE** (archive §28, índice/MAPA §39, DoD §35). Se o site tiver
  backend (formulário de contato que grava, newsletter, área logada), o back **delega** ao
  `engineering`/linguagem; o front, à `web`.

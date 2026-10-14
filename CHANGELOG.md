# Changelog — schematize-institutional

Todas as mudanças relevantes deste pacote, no formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
com versionamento [SemVer](https://semver.org/lang/pt-BR/).


## [0.5.0] — 2026-10-14
Integração com as 8 skills novas (skill-dev, iam, api, payments, postgres, incident, analytics, git) e saneamento pelo gate novo.

### Alterado
- Blocos herdados `engineering/precedencia:dominio` e `engineering/orquestracao:curto` (SKILL.md e assets/CLAUDE.md), exigidos pelo gate da `schematize-skill-dev`.
- Description reduzida a ≤190 caracteres para caber no orçamento do catálogo (45 skills).
- Ponteiros: `schematize-payments` (mecanismo de devolução/estorno) e `schematize-analytics` (consentimento da política de cookies) em `references/paginas-legais.md` e na relação com as skills.

## [0.4.1] — 2026-10-14
Reduz a description para o orçamento de listagem.

### Alterado
- Description reduzida (≤235 chars) para caber no orçamento de listagem de skills (soma ≤8300); mesmo território, fronteiras com as irmãs preservadas.

## [0.4.0] — 2026-10-14
Saneamento: o institucional deixa de contradizer a `schematize-seo` (fonte canônica) e de repetir o que ela já cobre.

### Corrigido
- **Sem `FAQPage`/`HowTo`/`SearchAction`.** `dados-estruturados.md`, `conteudo-paginas.md`, `arquitetura-informacao.md`, `SKILL.md`, README, `assets/CLAUDE.md` e `/institutional-scaffold` ensinavam JSON-LD de FAQPage e WebSite+SearchAction, rich results que a seo já declara mortos. A marcação saiu; a FAQ continua como Q&A visível em HTML. Aponta para `schematize-seo → references/dados-estruturados.md`.
- **`scripts/go-live.mjs` agora BARRA** FAQPage/HowTo/SearchAction no JSON-LD (4 casos novos em `go-live.test.sh`, 3 vermelhos + 1 verde).

### Alterado
- **Fronteira com a seo:** `sitemap-robots.md` (206 -> 54 linhas) fica só no específico (sitemap sai do inventário, o que vira `noindex`, scaffold) com ponteiros para `schematize-seo → references/tecnico.md`; `dados-estruturados.md` perde as seções de validação e piso duplicadas. Referência sem prefixo corrigida.
- Description reescrita em `>-`, <= 350 caracteres.
- **Description** reduzida (~270 chars) para caber no orçamento de listagem (soma das 31 skills ≤ 8500; o Claude Code corta a listagem acima disso).

## [0.3.0] — 2026-08-21

### Corrigido
- **hreflang ganhou a qualificação que faltava:** as páginas apontadas têm de ser **a MESMA página traduzida**. Ficou escrito onde isso quebrava aqui — *os quatro domínios da casa **não são traduções um do outro***, então aplicar hreflang entre eles declara como tradução o que é conteúdo diferente, e o buscador escolhe um, jogando fora a distinção que os domínios existem para manter. Regra final: dentro da propriedade sempre; entre domínios **só** com tradução 1:1 real; na dúvida, **não declare** — *hreflang ausente custa menos que hreflang mentiroso*.
- **Consentimento deixou de ser delegação sem destino:** a spec do banner agora existe na `schematize-web` (§49.4), e este reference aponta para ela pelo nome e pela seção.

### Mudado (premissa corrigida)
- O `dados-estruturados.md` **não é ~60% cópia literal** da `schematize-seo`: medido em 2026-08-21, **1 de 93** linhas substantivas é idêntica (1%) e 16 de 72 blocos (22%). O que sobrepõe é **tema**. Em vez de reduzir o arquivo a um ponteiro (jogando fora os blocos JSON-LD prontos, que são o valor dele), entrou a **fronteira em tabela** — catálogo/validação/entidade é da `seo`, injeção é da `web`, **quais tipos em quais páginas** é daqui — com a regra de desempate: *se um número aparecer nos dois, o da `schematize-seo` manda*.

## [0.2.0] — 2026-08-21
Os pontos abertos pela vistoria de 2026-08-21: **sem página de erro no baseline**, **sem gate de go-live**, **zero scripts**.

### Adicionado
- **Páginas 404 e 500 no baseline** (`arquitetura-informacao.md` + `conteudo-paginas.md`) — com o que realmente importa, que não é o desenho: **status HTTP correto** e **saída**. Página de erro que responde `200` é **soft-404** — a tela diz "não encontrado" e o crawler indexa como conteúdo válido; é o defeito que passa na revisão visual justamente porque *parece* certo na tela. A 500 nunca mostra stack trace, caminho de arquivo ou versão (vazamento de superfície de ataque) e **alerta do lado de dentro**: 500 que ninguém vê é incidente silencioso. As duas são `noindex` e ficam fora do sitemap. Entraram como **VETADO** os dois casos: página de erro com 200, e página de erro sem nenhum link.
- **`scripts/go-live.mjs`** + **`/institutional-golive`** — o gate que faltava, respondendo **por HTTP**. Ele pega exatamente o que a revisão visual não pega: `Disallow: /` do staging que viajou, `noindex` esquecido, soft-404, sitemap vazio ou apontando para outro host, página do baseline fora do sitemap, `<title>` duplicado (canibalização dentro do próprio site) e **canonical cruzado entre domínios da casa** — VETADO pela `schematize-seo`. `0` sobe · `1` reprova · `2` uso errado **ou site inalcançável**, que não é aprovação.
- **`scripts/go-live.test.sh`** — **17 casos** contra um site falso servido **de verdade por HTTP** (não mock), 15 quebrados de propósito.

### Corrigido (premissa da vistoria)
- A vistoria estimou *"~412 das 952 linhas de reference são cópia da seo"*. Medido em 2026-08-21 por dois métodos: **linha substantiva idêntica** (normalizada, >40 caracteres) dá **1 de 461 (0%)**; similaridade **bloco a bloco** contra `schematize-seo` dá **13–29% por arquivo** (~23% no total, ~230 linhas). A sobreposição é **temática, não cópia** — e a fronteira já está declarada no topo de 4 dos 5 references. O risco real não é o volume: é a divergência futura, e é por isso que a fronteira fica escrita, não presumida.

## [0.1.0] — 2026-08-18

Primeira versão da skill de **construção de sites institucionais** da casa.

### Adicionado
- **SKILL.md** com 8 pisos inegociáveis (conteúdo legal é SCAFFOLD, não aconselhamento
  jurídico; privacidade/cookies só fecham com os pontos LGPD; baseline institucional
  obrigatório; toda página self-canonical/uma intenção/no sitemap; JSON-LD reflete o
  conteúdo visível; estrutura ≠ engenharia ≠ SEO — delega à `web`/`seo`; ícones nunca
  emoji; archive obrigatório) e a fronteira com `schematize-web` (engenharia de frontend)
  e `schematize-seo` (SEO técnico/multi-domínio).
- **references/**:
  - `arquitetura-informacao.md` — inventário de páginas (baseline vs recomendado vs
    opcional): Home, Sobre, Serviços índice+detalhe, Legal índice + 7 subpáginas legais,
    Contato, Mapa do site; recomendadas (FAQ, Localização, Blog); opcionais (Carreiras,
    Cases, Parceiros, Imprensa, Acessibilidade…); hierarquia de URL, menu/rodapé.
  - `conteudo-paginas.md` — templates/checklists de conteúdo por página (o que cada uma
    precisa ter), com a regra anti-invenção (`[REVISAR: negócio]`).
  - `paginas-legais.md` — as 7 páginas legais como SCAFFOLD (Termos de uso, Termos de
    serviço, Privacidade, Cookies, Devolução, Frete, Estorno), com o aviso "NÃO é
    aconselhamento jurídico", os pontos LGPD obrigatórios e a matriz baseline vs e-commerce.
  - `dados-estruturados.md` — blocos JSON-LD por tipo de página (Organization + WebSite/
    SearchAction, BreadcrumbList, ItemList, Service/Product/Offer, LocalBusiness,
    ContactPage/ContactPoint, FAQPage, Article/BlogPosting, JobPosting, `@graph`).
  - `sitemap-robots.md` — sitemap.xml + robots.txt + hreflang derivados do inventário,
    canonical self, o que fica `noindex`, o essencial pra nascer indexável.
- **assets/commands/**: `/institutional-help`, `/institutional-scaffold` (gera inventário +
  JSON-LD + sitemap a partir de input mínimo), `/institutional-load`, `/institutional-claude`,
  `/institutional-cc`, `/institutional-handoff`.
- **assets/CLAUDE.md** — regra sempre-on do site institucional (baseline + legais como
  scaffold + delegação a web/seo).

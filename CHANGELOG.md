# Changelog — schematize-institutional

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/). Versionamento semântico.

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

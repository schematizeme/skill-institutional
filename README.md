# schematize-institutional

> **Construção de sites institucionais** da casa — a **ESTRUTURA**, não a engenharia. Quais páginas
> um site institucional precisa ter, o que cada uma precisa dizer, e como ela **nasce indexável**:
> inventário de páginas (com as legais que quase todo mundo esquece), template de conteúdo por
> página, dados estruturados (JSON-LD) certos por tipo, e sitemap/robots gerados do inventário.

Pacote de **skill normativa para [Claude Code](https://claude.com/claude-code)**.
Parte do catálogo **schematize skills**. É a camada de **estrutura e conteúdo**: **não** coda o
frontend (delega à `schematize-web`) e **não** faz a estratégia de SEO (delega à `schematize-seo`).

## Instalar

### Pelo app schematize (recomendado)

```bash
schematize install institutional      # requer o CLI schematize instalado
```

### Última versão (a partir de um clone)

```bash
git clone https://github.com/schematizeme/skill-institutional.git
cd skill-institutional && ./install.sh     # instala no projeto atual
# ./install.sh /caminho/do/projeto          # ou aponte para outro projeto
# ./install.sh ~                            # global (~/.claude, todos os projetos)
```

Ou baixe o `.zip` da última release e descompacte em `.claude/skills/`:

```bash
curl -L -o skill-institutional.zip \
  https://github.com/schematizeme/skill-institutional/releases/latest/download/skill-institutional.zip
unzip skill-institutional.zip -d .claude/skills/
```

## O que tem dentro

- **SKILL.md** — o contrato: 8 pisos inegociáveis (conteúdo legal é SCAFFOLD, não aconselhamento
  jurídico; privacidade/cookies só fecham com os pontos LGPD; baseline institucional obrigatório;
  toda página self-canonical/uma intenção/no sitemap; JSON-LD reflete o conteúdo visível; estrutura
  ≠ engenharia ≠ SEO; ícones nunca emoji; archive obrigatório) + fronteira com `web` e `seo`.
- **references/** — `arquitetura-informacao` (inventário de páginas baseline vs recomendado vs
  opcional: Home, Sobre, Serviços índice+detalhe, Legal índice + 7 subpáginas legais, Contato, Mapa
  do site…), `conteudo-paginas` (templates/checklists por página, anti-invenção), `paginas-legais`
  (as 7 legais como SCAFFOLD + pontos LGPD + "NÃO é aconselhamento jurídico"), `dados-estruturados`
  (JSON-LD por tipo: Organization+WebSite, BreadcrumbList, ItemList, Service/Product,
  LocalBusiness, ContactPoint, Article, JobPosting, `@graph`), `sitemap-robots`
  (sitemap.xml + robots.txt + hreflang derivados do inventário, canonical self, `noindex`).
- **assets/commands/** — `/institutional-help`, `/institutional-scaffold` (gera inventário + JSON-LD
  + sitemap a partir de input mínimo), `/institutional-load`, `/institutional-claude`,
  `/institutional-cc`, `/institutional-handoff`.
- **assets/CLAUDE.md** — regra sempre-on do site institucional.

## Regra de ouro

**A skill entrega o mapa do prédio e a lista do que vai em cada sala.** A `schematize-web` constrói
as salas (como codar: Next/Astro, RSC, a11y, CWV, build, i18n, JSON-LD no `<head>`); a
`schematize-seo` faz o prédio aparecer no mapa da cidade (como rankear). O conteúdo legal é
**scaffold com os pontos LGPD obrigatórios** — estrutura, **não** aconselhamento jurídico (revisão
por advogado obrigatória).

## Relação com as outras skills

- **schematize-web** — a **ENGENHARIA de frontend**: Next.js/Astro, RSC, fronteira client/server,
  a11y WCAG 2.2 AA, Core Web Vitals, build, deploy, i18n com URL por idioma, sitemap autogerado,
  injeção do JSON-LD no `<head>`.
- **schematize-seo** — o **SEO** fino: técnico, keywords, on-page, topic clusters, multi-domínio sem
  canibalização, hreflang recíproco, AIO/LLMO/GEO, autoridade/E-E-A-T, medição.
- **schematize-engineering** — a base (archive, índice, DoD) que o projeto do site herda.

Co-autoria / patrocínio: Lucassa — https://lucassa.me

MIT.

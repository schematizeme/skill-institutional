# CLAUDE.md — Site Institucional da Casa (sempre on)

> Copie para a **raiz do repositório** do site institucional e ajuste `<empresa>`/`<domínio>`. Fica
> pinado no contexto de toda tarefa e garante a estrutura mesmo quando a skill
> `schematize-institutional` não dispara sozinha. Em repo multi-skill, use **junto** com os
> `CLAUDE.md` do `schematize-web` (engenharia de front) e do `schematize-seo` (SEO) — rode
> `/institutional-claude` que mescla, sem sobrescrever os outros blocos.

## Regra mestre

Um site institucional da casa **nasce com a estrutura inteira**: o **inventário** de páginas
(baseline + as legais), o **conteúdo padrão** de cada página, os **dados estruturados** certos e o
**sitemap/robots** que o deixam indexável. Esta skill governa a **ESTRUTURA e o CONTEÚDO** — **não**
a engenharia de frontend (delega ao **`schematize-web`**) nem a estratégia de SEO (delega ao
**`schematize-seo`**). Consulte o reference antes de agir — não trabalhe de memória.

## Pisos inegociáveis (VETADO — sem exceção)

1. **Conteúdo legal é SCAFFOLD, não aconselhamento jurídico.** As páginas legais saem como
   **estrutura + placeholders + pontos obrigatórios**, com os pontos jurídicos marcados
   `[REVISAR: advogado]`. **VETADO** apresentar minuta legal como "pronta". Revisão por advogado(a)
   é obrigatória antes de publicar; a responsabilidade jurídica é do dono do site.
2. **Privacidade e cookies só fecham com os pontos de LGPD.** Privacidade: controlador,
   encarregado/DPO, dados, finalidade, base legal, compartilhamento, retenção, direitos do titular
   e como exercê-los. Cookies: categorias + **consentimento opt-in** dos não-essenciais (nada de
   cookie não-essencial antes do aceite).
3. **Baseline institucional é obrigatório.** Home, Quem somos/Sobre, Serviços/Produtos (índice +
   detalhe por serviço), Legal (índice + as subpáginas aplicáveis: sempre Termos de uso, Termos de
   serviço, Privacidade, Cookies; + Devolução/Frete/Estorno se vende), Contato, Mapa do site,
   sitemap.xml, robots.txt. Faltou uma → não está pronto.
4. **Toda página é self-canonical, com UMA intenção, e nasce indexável.** No `sitemap.xml`,
   `rel=canonical` para si mesma; o que não deve indexar (obrigado/busca/privado) é `noindex` de
   propósito. O site institucional **nasce rastreável**.
5. **JSON-LD reflete o conteúdo VISÍVEL.** O tipo certo por página (Organization/WebSite/
   BreadcrumbList/Service/Product/LocalBusiness/Article (sem FAQPage/HowTo/SearchAction)); **nunca** marcar rich result
   ausente (FAQ oculto, avaliação inventada, endereço/preço que não estão na tela).
6. **Estrutura ≠ engenharia ≠ SEO — delegue.** Implementação no front (Next/Astro, RSC, a11y AA,
   Core Web Vitals, build, i18n em runtime, injeção do JSON-LD, `app/sitemap.ts`) → **`schematize-web`**.
   Estratégia de SEO (keywords, on-page fino, multi-domínio sem canibalização, hreflang em escala,
   AIO, medição) → **`schematize-seo`**. **VETADO** reimplementar o front ou refazer o plano de SEO aqui.
7. **Ícones, nunca emoji, na estrutura do site** (nav/cards/títulos/rodapé), salvo pedido explícito.
   Refino visual e UI são da `schematize-web`.
8. **Nunca inventar conteúdo institucional.** Número, prêmio, certificação, depoimento, cliente,
   dado de contato que não foi fornecido sai como `[REVISAR: negócio: <o quê>]`, nunca como fato.
9. **Archive obrigatório.** Inventário + templates + JSON-LD + sitemap/robots gerados vão para o
   `<projeto>_archive/`. Sem archive, a entrega não aconteceu.

## Como se faz aqui

- **Site novo / estrutura (`/institutional-scaffold`):** colhe o input mínimo (nome, serviços,
  idiomas, e-commerce?, endereço?), monta o **inventário** (baseline + opcionais), gera os
  **templates de conteúdo**, as **legais como scaffold** (`[REVISAR: advogado]`), os **JSON-LD** por
  tipo e o **sitemap.xml/robots.txt** (+ hreflang), grava no archive e **delega** front à `web` e
  SEO à `seo`.
- **Revisar/auditar:** confira o baseline, os pontos LGPD nas legais, o self-canonical + sitemap, e
  que o JSON-LD reflete o visível.

## Relação com as outras skills

- **schematize-web** — a engenharia de frontend (como codar as páginas, sitemap autogerado, a11y,
  CWV, i18n, injeção do JSON-LD). Esta skill diz *quais páginas e qual conteúdo*.
- **schematize-seo** — a disciplina de SEO (keywords, on-page fino, multi-domínio, AIO, medição).
  Esta skill garante que o site *nasce indexável*; o *como rankear* é da seo.
- **schematize-scaffold / engineering** — o piso do projeto (repos, IAM, ops, DoD, archive/índice);
  o back de formulários/newsletter delega à linguagem.

## Gestão de contexto (sessões longas)

Ao se aproximar do teto de contexto: **PARE e** gere o handoff em `<projeto>_archive/context/`
(inventário decidido + páginas FEITAS vs EM ABERTO + legais pendentes de revisão) **antes** de
compactar (`/institutional-cc`).

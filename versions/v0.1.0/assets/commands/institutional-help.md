---
description: schematize-institutional — lista todos os comandos disponíveis e o que cada um faz
---

Mostre ao usuário a lista de comandos do conjunto **schematize-institutional**, em tabela legível
(ajuste se houver comandos novos em `.claude/commands/`):

| Comando | O que faz |
|---|---|
| `/institutional-help` | Lista todos os comandos do schematize-institutional (este). |
| `/institutional-scaffold` | A partir de um **input mínimo** (nome da empresa, serviços/produtos, idiomas, é e-commerce?, tem endereço?) gera a **estrutura do site institucional**: inventário de páginas (baseline + opcionais), templates de conteúdo por página, as páginas legais como SCAFFOLD (com pontos LGPD, `[REVISAR: advogado]`), os blocos **JSON-LD** por tipo e o **sitemap.xml + robots.txt** (+ hreflang se multi-idioma) — e grava no archive. |
| `/institutional-load` | Carrega à força TODO o corpo normativo (IA/inventário, conteúdo, legais, dados estruturados, sitemap) e passa a aplicá-lo. |
| `/institutional-claude` | Cria ou mescla o `CLAUDE.md` sempre-on do institucional na raiz do repo. |
| `/institutional-cc` | Context compact: gera handoff no archive e roda `/compact`. |
| `/institutional-handoff` | Gera o handoff (context.md + checklist.md) sem compactar. |

Depois da tabela, diga em uma linha:
- O detalhe normativo está na skill `schematize-institutional` (`references/`).
- Esta skill governa a **ESTRUTURA** do site (inventário de páginas, conteúdo padrão, JSON-LD,
  sitemap) — a **engenharia de frontend** (Next/Astro, RSC, a11y, performance, i18n em runtime) é do
  **`schematize-web`**; o **SEO técnico/keywords/multi-domínio/AIO** é do **`schematize-seo`**.
- Regra de ouro: **conteúdo legal é scaffold, não aconselhamento jurídico** — sempre `[REVISAR:
  advogado]` e revisão por advogado antes de publicar.

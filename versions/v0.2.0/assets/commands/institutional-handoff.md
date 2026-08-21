---
description: Gera o handoff de contexto (context.md + checklist.md) no archive, SEM compactar
---

Gere o handoff do site institucional **sem** compactar — pra fim de sessão ou troca de tarefa:

1. `<projeto>_archive/context/<YYYY-MM-DD-HH-MM-SS>-context.md` — inventário de páginas decidido
   (baseline + opcionais), páginas com conteúdo/JSON-LD prontas vs pendentes, estado das legais
   (scaffold gerado, `[REVISAR: advogado]` pendente), sitemap/robots gerados, delegações a
   `web`/`seo`, decisões, onde parou.
2. `<projeto>_archive/context/<YYYY-MM-DD-HH-MM-SS>-checklist.md` — **FEITO vs EM ABERTO** (o
   checklist de inventário de `references/arquitetura-informacao.md` + legais pendentes de revisão).

Não rode `/compact` — só arquiva.

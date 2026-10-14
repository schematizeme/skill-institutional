---
description: Context Compact — gera handoff (context.md + checklist.md) no <projeto>_archive e compacta
---

Antes de compactar, **arquive o handoff** (não perca o estado do site institucional):

1. `<projeto>_archive/context/<YYYY-MM-DD-HH-MM-SS>-context.md` — estado: inventário de páginas
   decidido (baseline + opcionais escolhidas), quais páginas já têm conteúdo/JSON-LD, estado das
   páginas legais (scaffold gerado? `[REVISAR: advogado]` pendente?), sitemap/robots gerados, o que
   foi delegado à `web`/`seo`, onde parou.
2. `<projeto>_archive/context/<YYYY-MM-DD-HH-MM-SS>-checklist.md` — **FEITO vs EM ABERTO** (o
   checklist de inventário de `references/arquitetura-informacao.md` + legais pendentes de revisão
   jurídica).
3. Só então rode `/compact` (foco na tarefa corrente).

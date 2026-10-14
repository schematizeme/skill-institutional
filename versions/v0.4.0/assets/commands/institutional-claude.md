---
description: schematize-institutional — cria ou mescla o CLAUDE.md sempre-on do site institucional na raiz do repo (não sobrescreve blocos de outras skills)
---

Instale/atualize a regra **sempre-on** de site institucional na raiz do repositório.

1. Pegue `assets/CLAUDE.md` da skill `schematize-institutional` (projeto ou `~/.claude/skills/...`).
2. Se **não existe** `CLAUDE.md` na raiz: crie com esse conteúdo.
3. Se **já existe** (de outra skill — web/seo/scaffold/...): **mescle** — adicione a seção de site
   institucional **sem sobrescrever** os blocos das outras skills. Em repo multi-skill, cada CLAUDE
   convive; o piso do institucional é aditivo (e explicitamente delega front à `web` e SEO à `seo`).
4. Se houver customização local, salve `./CLAUDE.md.bak` e reaplique por cima.
5. Confirme a versão aplicada e destaque o **piso**: conteúdo legal é scaffold (não aconselhamento
   jurídico, `[REVISAR: advogado]`); baseline institucional obrigatório; toda página self-canonical
   e no sitemap; JSON-LD reflete o visível; ícones nunca emoji; engenharia delega à `schematize-web`,
   SEO à `schematize-seo`.

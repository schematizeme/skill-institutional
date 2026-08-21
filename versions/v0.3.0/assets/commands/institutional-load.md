---
description: schematize-institutional — carrega à força TODO o corpo normativo (IA/inventário, conteúdo, legais, dados estruturados, sitemap) e passa a aplicá-lo
---

Carregue **à força** e passe a aplicar **integralmente** a skill `schematize-institutional` neste
projeto. A partir de agora, nesta sessão, isto **não é opcional**.

1. **Leia agora, na íntegra, TODOS os references** — não trabalhe de memória. Caminho:
   `.claude/skills/schematize-institutional/references/*.md` (projeto) ou
   `~/.claude/skills/schematize-institutional/references/*.md` (global):
   - `arquitetura-informacao.md` — o **inventário de páginas** (baseline: Home, Sobre, Serviços
     índice+detalhe, Legal índice + subpáginas legais, Contato, Mapa do site; recomendadas e
     opcionais), hierarquia de URL, menu/rodapé, baseline vs opcional.
   - `conteudo-paginas.md` — os **templates/checklists de conteúdo** por página.
   - `paginas-legais.md` — as **7 páginas legais como SCAFFOLD** (não é aconselhamento jurídico),
     pontos LGPD obrigatórios, matriz baseline vs e-commerce.
   - `dados-estruturados.md` — os **blocos JSON-LD** por tipo de página.
   - `sitemap-robots.md` — **sitemap.xml + robots.txt + hreflang** derivados do inventário,
     canonical self, o essencial pra nascer indexável.

2. **Confirme ao usuário** que leu (1 linha por arquivo).

3. Deste ponto, aplique como regra inegociável: **conteúdo legal é scaffold, não aconselhamento
   jurídico** (`[REVISAR: advogado]`); **privacidade/cookies só fecham com os pontos LGPD**;
   **baseline institucional obrigatório**; **toda página self-canonical / uma intenção / no
   sitemap**; **JSON-LD reflete o conteúdo visível**; **ícones, nunca emoji**; **archive
   obrigatório**. A **engenharia de frontend** delega ao `schematize-web`; o **SEO fino** ao
   `schematize-seo`.

4. **Atualize o `CLAUDE.md` da raiz** com `assets/CLAUDE.md` da skill (mescla se já houver de outra
   skill) — é o `/institutional-claude`.

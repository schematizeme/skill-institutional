# Templates / Checklists de Conteúdo por Página — Site Institucional

> Parte da skill **schematize-institutional**. Diz **o que cada página precisa ter** (blocos de
> conteúdo, campos obrigatórios). É o *briefing de conteúdo* — não o layout (a `schematize-web`
> decide componentes/estilo/a11y) nem a redação otimizada por keyword (a `schematize-seo` decide
> intenção/title/meta/topic cluster). As páginas legais têm reference próprio: `paginas-legais.md`.

Convenção: cada página lista **blocos** (o que aparece) e um **checklist**. Marque
`[REVISAR: negócio]` onde o conteúdo depende de informação real do dono do site — não invente número,
depoimento, prêmio ou dado que não foi fornecido.

---

## Home (`/`)

**Blocos**
1. **Hero**: proposta de valor em 1 frase (o que a empresa faz e pra quem) + subtítulo + CTA
   primário. Sem jargão vazio.
2. **Prova rápida**: logos de clientes/parceiros, números (anos, projetos, clientes) — só se reais.
3. **Serviços em destaque**: 3–6 cards linkando o detalhe de cada serviço.
4. **Diferenciais**: por que esta empresa (3–4 pontos concretos).
5. **Prova social**: 1–2 depoimentos ou cases (linkando `/cases` se houver).
6. **Bloco de confiança**: certificações, associações, segurança (se houver).
7. **CTA final**: converter (contato/orçamento) + canais.

**Checklist**
- [ ] Proposta de valor clara no hero (não "bem-vindo ao nosso site").
- [ ] Todo número/logo/depoimento é **real** (`[REVISAR: negócio]` se não fornecido).
- [ ] Links pros hubs (Sobre, Serviços, Contato) presentes.
- [ ] `WebSite` (+`SearchAction` se houver busca) e `Organization` no JSON-LD.
- [ ] Um H1 único; CTA de conversão acima da dobra.

---

## Quem somos / Sobre (`/sobre`)

**Blocos**
1. **Quem somos**: o que a empresa é, em 1–2 parágrafos.
2. **História / linha do tempo**: fundação, marcos (se houver).
3. **Missão, visão, valores**: concretos, não clichê.
4. **Time / liderança**: fotos, nomes, cargos (opcional, forte pra E-E-A-T).
5. **Números/impacto**: dados reais.
6. **CTA**: contato / carreiras.

**Checklist**
- [ ] História e missão reais (`[REVISAR: negócio]`).
- [ ] Time com nomes reais (ajuda E-E-A-T — ver `schematize-seo`); nunca "equipe" genérica se há
      pessoas públicas.
- [ ] `Organization`/`AboutPage` + `BreadcrumbList` no JSON-LD.
- [ ] Dados institucionais (razão social, fundação) coerentes com o rodapé.

---

## Serviços/Produtos — índice (`/servicos`)

**Blocos**
1. **Intro**: o leque de serviços/produtos em 1 parágrafo.
2. **Grade de serviços**: card por serviço (nome, resumo de 1 linha, ícone, link pro detalhe).
3. **CTA**: orçamento/contato.

**Checklist**
- [ ] Todo serviço tem card **e** página de detalhe própria (não empilhar tudo aqui).
- [ ] `ItemList` + `BreadcrumbList` no JSON-LD.
- [ ] Cada card linka `/servicos/[slug]`.

---

## Serviço/Produto — detalhe (`/servicos/[slug]`)

**Blocos**
1. **Título + resumo**: o que é este serviço.
2. **Para quem / que problema resolve**.
3. **Como funciona**: etapas/entregáveis.
4. **Benefícios / diferenciais**.
5. **Prova**: case ou depoimento ligado a este serviço (se houver).
6. **FAQ do serviço** (opcional; se visível, marca `FAQPage`).
7. **CTA**: contratar/orçamento.
8. **Preço** (se aplicável e público) → habilita `Offer` no JSON-LD.

**Checklist**
- [ ] Uma intenção por serviço; título e conteúdo específicos (não copiar entre serviços).
- [ ] `Service` (ou `Product` se é produto) + `BreadcrumbList` no JSON-LD.
- [ ] Preço no JSON-LD **só** se está visível na página.
- [ ] FAQ marcada **só** se visível na tela.

---

## Contato (`/contato`)

**Blocos**
1. **Canais**: e-mail, telefone/WhatsApp, horário de atendimento.
2. **Formulário**: nome, e-mail, mensagem (+ consentimento LGPD se captura dado — link pra
   privacidade). O back do formulário delega ao `schematize-engineering`/linguagem; o front à `web`.
3. **Endereço + mapa** (se físico) → também alimenta `LocalBusiness`/`/onde-estamos`.
4. **Redes sociais**.

**Checklist**
- [ ] Canais reais e testados (e-mail que existe, telefone que atende).
- [ ] Formulário com **consentimento** e link à Política de Privacidade (LGPD).
- [ ] `ContactPage` + `ContactPoint` no JSON-LD; `LocalBusiness` se há endereço.
- [ ] Página de sucesso (`obrigado`) é `noindex` (ver `sitemap-robots.md`).

---

## FAQ (`/faq`) — recomendado

**Blocos**
1. Perguntas agrupadas por tema, cada uma com resposta objetiva **visível** na página.

**Checklist**
- [ ] Perguntas reais dos clientes (não inventadas pra encher).
- [ ] `FAQPage` JSON-LD **só** com as perguntas/respostas exibidas (piso: nunca marcar FAQ oculto).
- [ ] Respostas curtas e citáveis (bom pra AIO — ver `schematize-seo`).

---

## Localização / Onde estamos (`/onde-estamos`) — se endereço físico

**Blocos**
1. Endereço completo, horário, telefone, mapa incorporado, foto da fachada, como chegar.

**Checklist**
- [ ] Endereço = mesmo do rodapé, do Contato e do `LocalBusiness` (NAP consistente).
- [ ] `LocalBusiness` + `BreadcrumbList` no JSON-LD, com `openingHours` e `geo` se disponível.

---

## Blog/Notícias — índice (`/blog`) e post (`/blog/[slug]`) — recomendado

**Índice**: lista de posts (título, data, resumo, autor, capa), paginação. JSON-LD `Blog`.
**Post**: H1 = título, autor real (Person), data de publicação, corpo, imagem de capa, CTA.
JSON-LD `Article`/`BlogPosting` (ver `dados-estruturados.md`).

**Checklist (post)**
- [ ] Autor **real** (E-E-A-T), `datePublished` verdadeira.
- [ ] `Article`/`BlogPosting` + `BreadcrumbList`; `headline` ≤ 110 chars.
- [ ] Estratégia de conteúdo (intenção, cluster) delega à `schematize-seo`.

---

## Carreiras (`/carreiras`, `/carreiras/[slug]`) — opcional

**Índice**: cultura, benefícios, vagas abertas. **Vaga**: título, local, modelo, requisitos,
responsabilidades, como aplicar. JSON-LD `JobPosting` na vaga (com `datePosted`, `validThrough`,
`hiringOrganization`, `jobLocation`).

**Checklist (vaga)**
- [ ] `JobPosting` com `validThrough` real; remover/`noindex` vaga fechada.

---

## Depoimentos/Cases (`/cases`), Parceiros (`/parceiros`), Imprensa (`/imprensa`) — opcional

- **Cases**: problema → solução → resultado (com números reais). `[REVISAR: negócio]`.
- **Parceiros**: logos + descrição (só parceiros reais/autorizados a exibir logo).
- **Imprensa**: releases, kit de mídia (logos, fotos em alta), contato de imprensa.

---

## Acessibilidade (`/acessibilidade`) — opcional/recomendado

**Blocos**: nível de conformidade alvo (WCAG 2.2 AA — padrão da casa via `schematize-web`), recursos
de acessibilidade do site, canal para relatar barreiras, data da última avaliação.

**Checklist**
- [ ] Declara o alvo real (não prometer AA sem a `web` ter entregue AA).
- [ ] Canal de contato para relato de barreira.

---

## Mapa do site — HTML (`/mapa-do-site`)

**Blocos**: lista hierárquica **humana** de todas as páginas públicas, agrupada por seção
(Institucional, Serviços, Legal, Blog…). Complementa o `sitemap.xml` (máquina).

**Checklist**
- [ ] Lista **todas** as páginas públicas do inventário; espelha a hierarquia.
- [ ] Linkado no rodapé.

---

## Regra transversal de conteúdo

**VETADO** inventar: número, prêmio, certificação, depoimento, cliente, dado de contato. O que não
for fornecido pelo dono do site sai como **placeholder** `[REVISAR: negócio: <o quê>]`, nunca como
fato. Conteúdo institucional falso queima confiança e, em prova social/avaliação, vira violação de
dados estruturados (ver `dados-estruturados.md`).

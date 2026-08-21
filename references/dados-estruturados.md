# Dados Estruturados (schema.org / JSON-LD) por Tipo de Página — Site Institucional

> Parte da skill **schematize-institutional**. Traz os **blocos JSON-LD de referência** por tipo de
> página do site institucional. A **disciplina completa** de dados estruturados (catálogo geral,
> validação, penalização, multi-domínio) é da **schematize-seo** (`references/dados-estruturados.md`
> lá); a **implementação** (injetar o `<script>` no `<head>`/`metadata`, gerar por rota) é da
> **schematize-web**. Aqui é o **kit institucional aplicado**: quais tipos vão em quais páginas do
> site institucional e os blocos prontos pra adaptar.

> **O que é daqui e o que NÃO é** (medido em 2026-08-21, para a fronteira não depender de memória):
> comparando linha a linha com a `schematize-seo`, **1 de 93** linhas substantivas é idêntica (1%);
> bloco a bloco, 16 de 72 (22%) — não os ~60% que a vistoria estimou. O que sobrepõe é **tema**, não
> texto. Ainda assim, a fronteira vale escrita, porque é ela que impede a próxima divergência:
>
> | Assunto | Dono |
> |---|---|
> | O catálogo geral de tipos, validação, penalização, entidade cross-domain, âncora do `Organization` | **`schematize-seo`** → `references/dados-estruturados.md` |
> | Como injetar o `<script type="application/ld+json">` (rota, `metadata`, geração) | **`schematize-web`** |
> | **Quais tipos vão em quais páginas do site institucional**, e os **blocos prontos** para adaptar | **este arquivo** |
>
> Se um número (âncora, idioma, política de rich result) aparecer nos dois, **o da `schematize-seo`
> manda** — aqui é aplicação, não definição.

Convenção: **MUST** = regra; **VETADO** = piso. Substitua `EMPRESA`, `https://exemplo.com.br`,
`[...]` pelos dados reais. **Todo campo do markup precisa existir VISÍVEL na página.**

---

## Piso (herdado da schematize-seo)

- **VETADO** marcar rich result que a página **não mostra** (FAQ oculto, avaliação inventada,
  endereço inexistente, preço que não está na tela). É violação de diretriz → **ação manual** que
  derruba os rich results do domínio inteiro.
- **MUST** JSON-LD em `<script type="application/ld+json">`; **um bloco por tipo** (ou `@graph`);
  `@id` absoluto e estável; datas ISO 8601; URLs absolutas; `inLanguage` coerente com `<html lang>`.
- Reuse a **mesma** `Organization` por `@id` em todo o site (referenciada por `publisher`/`provider`).

---

## Mapa: tipo de dado estruturado por página

| Página | JSON-LD |
|---|---|
| Todo o site (compartilhado) | `Organization` (referenciado por `@id`) |
| Home | `WebSite` (+ `SearchAction` se há busca) + `Organization` |
| Sobre | `Organization` / `AboutPage` |
| Serviços (índice) | `BreadcrumbList` + `ItemList` |
| Serviço (detalhe) | `Service` (ou `Product` + `Offer`) + `BreadcrumbList` |
| Legal (índice + subpáginas) | `BreadcrumbList` |
| Contato | `ContactPage` + `ContactPoint` (no `Organization`) |
| Localização / Onde estamos | `LocalBusiness` (se endereço físico) |
| FAQ | `FAQPage` (só se visível) |
| Blog (índice) | `Blog` |
| Post | `Article` / `BlogPosting` |
| Vaga | `JobPosting` |
| **Todas** com hierarquia | `BreadcrumbList` |

---

## Organization (compartilhado, referenciado por `@id`)

Identidade da empresa. Uma vez, reusada por `@id` em todo o site. Inclui o `ContactPoint`.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://exemplo.com.br/#org",
  "name": "EMPRESA",
  "legalName": "EMPRESA LTDA",
  "url": "https://exemplo.com.br",
  "logo": "https://exemplo.com.br/logo.png",
  "description": "[o que a empresa faz, 1 frase]",
  "sameAs": [
    "https://www.linkedin.com/company/EMPRESA",
    "https://www.instagram.com/EMPRESA"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contato@exemplo.com.br",
    "telephone": "+55-11-0000-0000",
    "areaServed": "BR",
    "availableLanguage": ["Portuguese"]
  }]
}
```

**MUST** — `logo` é imagem real; `sameAs` só lista perfis que a empresa controla.

---

## WebSite (+ SearchAction) — Home

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://exemplo.com.br/#website",
  "url": "https://exemplo.com.br",
  "name": "EMPRESA",
  "inLanguage": "pt-BR",
  "publisher": { "@id": "https://exemplo.com.br/#org" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://exemplo.com.br/busca?q={query}",
    "query-input": "required name=query"
  }
}
```

**MUST** — só declare `SearchAction` se a busca interna existe e funciona (senão, remova o
`potentialAction`).

---

## BreadcrumbList (toda página com hierarquia)

Espelha o breadcrumb **visível**. Exemplo para `/servicos/consultoria`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://exemplo.com.br/" },
    { "@type": "ListItem", "position": 2, "name": "Serviços", "item": "https://exemplo.com.br/servicos" },
    { "@type": "ListItem", "position": 3, "name": "Consultoria", "item": "https://exemplo.com.br/servicos/consultoria" }
  ]
}
```

---

## ItemList — Serviços (índice)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://exemplo.com.br/servicos/consultoria", "name": "Consultoria" },
    { "@type": "ListItem", "position": 2, "url": "https://exemplo.com.br/servicos/implantacao", "name": "Implantação" }
  ]
}
```

---

## Service — Serviço (detalhe)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Consultoria",
  "serviceType": "Consultoria em [área]",
  "url": "https://exemplo.com.br/servicos/consultoria",
  "description": "[o que o serviço entrega]",
  "provider": { "@id": "https://exemplo.com.br/#org" },
  "areaServed": { "@type": "Country", "name": "Brasil" }
}
```

Se for **produto** com preço público na página, use `Product` + `Offer`:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Produto]",
  "description": "[descrição]",
  "url": "https://exemplo.com.br/servicos/produto",
  "brand": { "@id": "https://exemplo.com.br/#org" },
  "offers": {
    "@type": "Offer",
    "price": "199.00",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "url": "https://exemplo.com.br/servicos/produto"
  }
}
```

**VETADO** — `aggregateRating`/`review` sem avaliação **real e visível** na página. `price` só se
está na tela.

---

## LocalBusiness — Localização (se endereço físico)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://exemplo.com.br/#local",
  "name": "EMPRESA",
  "image": "https://exemplo.com.br/fachada.jpg",
  "url": "https://exemplo.com.br/onde-estamos",
  "telephone": "+55-11-0000-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Exemplo, 123",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "00000-000",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -23.55, "longitude": -46.63 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "18:00"
  }]
}
```

**MUST** — **NAP consistente**: nome/endereço/telefone iguais aqui, no rodapé e no Contato. Endereço
e geo reais. Use o subtipo mais específico de `LocalBusiness` quando existir (ex.: `Restaurant`,
`Store`, `LegalService`).

---

## ContactPage / ContactPoint — Contato

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": "https://exemplo.com.br/contato",
  "name": "Contato — EMPRESA",
  "about": { "@id": "https://exemplo.com.br/#org" }
}
```

O `ContactPoint` detalhado vive no `Organization` (acima). Não duplicar telefone divergente.

---

## FAQPage — FAQ (só se visível)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "[Pergunta exibida na página]",
    "acceptedAnswer": { "@type": "Answer", "text": "[Resposta exibida na página]" }
  }]
}
```

**VETADO** (piso) — `FAQPage` só com perguntas/respostas **visíveis** na tela. FAQ oculto/accordion
que não abre/perguntas não mostradas → ação manual.

---

## Article / BlogPosting — Post

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Título ≤ 110 chars]",
  "url": "https://exemplo.com.br/blog/[slug]",
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-05",
  "inLanguage": "pt-BR",
  "author": { "@type": "Person", "name": "[Autor real]", "url": "https://exemplo.com.br/autores/[slug]" },
  "publisher": { "@id": "https://exemplo.com.br/#org" },
  "image": "https://exemplo.com.br/blog/[slug]/capa.jpg"
}
```

**MUST** — `author` é pessoa **real** (E-E-A-T), `datePublished` verdadeira, `headline` ≤ 110 chars.

---

## JobPosting — Vaga (opcional)

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "[Cargo]",
  "description": "[HTML da descrição da vaga]",
  "datePosted": "2026-01-01",
  "validThrough": "2026-03-01T23:59",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@id": "https://exemplo.com.br/#org" },
  "jobLocation": {
    "@type": "Place",
    "address": { "@type": "PostalAddress", "addressLocality": "São Paulo", "addressRegion": "SP", "addressCountry": "BR" }
  }
}
```

**MUST** — `validThrough` real; vaga fechada sai do sitemap e vira `noindex` (não deixar
`JobPosting` expirado marcado).

---

## Combinando tipos numa página: `@graph`

Quando a página tem vários tipos (ex.: Home com `Organization` + `WebSite`), use um `@graph` ou
vários `<script>`. Não misture tipos soltos no mesmo objeto.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://exemplo.com.br/#org", "name": "EMPRESA", "url": "https://exemplo.com.br" },
    { "@type": "WebSite", "@id": "https://exemplo.com.br/#website", "url": "https://exemplo.com.br", "publisher": { "@id": "https://exemplo.com.br/#org" } }
  ]
}
```

---

## Validação (obrigatória antes de publicar)

| Ferramenta | Para quê |
|---|---|
| **Rich Results Test** (Google) | elegibilidade a rich result |
| **Schema Markup Validator** (schema.org) | sintaxe/vocabulário |
| **Search Console → Ações manuais** | monitorar penalização em produção |

Sem erro no validador **e** o campo existe visível na página → passou. A disciplina completa (por que
validar, penalizações, multi-domínio/entidade única cross-domain) é da `schematize-seo`.

---

## Checklist (dados estruturados, por página)

- [ ] O tipo **certo** para a página está marcado (mapa acima).
- [ ] `Organization` única, reusada por `@id`; `ContactPoint` sem telefone divergente.
- [ ] `BreadcrumbList` em toda página com hierarquia, espelhando o breadcrumb **visível**.
- [ ] `WebSite`/`SearchAction` só com busca real; `LocalBusiness` só com endereço real (NAP consistente).
- [ ] `Service`/`Product` no detalhe; `Offer`/preço só se visível; **sem** avaliação inventada.
- [ ] `FAQPage` só com FAQ visível; `Article` com autor real e data verdadeira.
- [ ] `@id` absolutos, datas ISO 8601, URLs absolutas, `inLanguage` = `<html lang>`.
- [ ] Passou no Rich Results Test e no Schema Validator, sem erro.
- [ ] Injeção do `<script>` no front delegada à `schematize-web`.

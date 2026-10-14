# Dados Estruturados (schema.org / JSON-LD) por Tipo de Página — Site Institucional

> Parte da skill **schematize-institutional**. Traz os **blocos JSON-LD de referência** por tipo de
> página do site institucional. A **disciplina completa** de dados estruturados (catálogo geral,
> validação, penalização, multi-domínio) é da **schematize-seo** (`references/dados-estruturados.md`
> lá); a **implementação** (injetar o `<script>` no `<head>`/`metadata`, gerar por rota) é da
> **schematize-web**. Aqui é o **kit institucional aplicado**: quais tipos vão em quais páginas do
> site institucional e os blocos prontos pra adaptar.

> **Fronteira.** O catálogo de tipos, validação, penalização, rich results mortos (FAQPage, HowTo,
> SearchAction) e entidade cross-domain são da **`schematize-seo → references/dados-estruturados.md`**
> — se algo aparecer nos dois, o de lá manda. A injeção do `<script>` é da **schematize-web**. Aqui:
> **quais tipos vão em quais páginas do institucional** e os blocos prontos.
>
> **Não marcamos `FAQPage` nem `SearchAction`:** saíram da galeria de rich results (ver a seo). A FAQ
> continua existindo como Q&A **visível** em HTML (`<h2>`/`<details>` ou lista) e a busca interna
> continua existindo; só a marcação sai.

Convenção: **MUST** = regra; **VETADO** = piso. Substitua `EMPRESA`, `https://exemplo.com.br`,
`[...]` pelos dados reais. **Todo campo do markup precisa existir VISÍVEL na página.**

---

## Piso

- **VETADO** marcar o que a página **não mostra** (avaliação inventada, endereço inexistente, preço fora da tela) — ação manual; detalhes na `schematize-seo`.
- **MUST** JSON-LD em `<script type="application/ld+json">`, `@id` absoluto e estável, datas ISO 8601, URLs absolutas; reuse a **mesma** `Organization` por `@id`.

---

## Mapa: tipo de dado estruturado por página

| Página | JSON-LD |
|---|---|
| Todo o site (compartilhado) | `Organization` (referenciado por `@id`) |
| Home | `WebSite` + `Organization` |
| Sobre | `Organization` / `AboutPage` |
| Serviços (índice) | `BreadcrumbList` + `ItemList` |
| Serviço (detalhe) | `Service` (ou `Product` + `Offer`) + `BreadcrumbList` |
| Legal (índice + subpáginas) | `BreadcrumbList` |
| Contato | `ContactPage` + `ContactPoint` (no `Organization`) |
| Localização / Onde estamos | `LocalBusiness` (se endereço físico) |
| FAQ | `BreadcrumbList` (Q&A visível em HTML, sem marcação de FAQ) |
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

## WebSite — Home

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://exemplo.com.br/#website",
  "url": "https://exemplo.com.br",
  "name": "EMPRESA",
  "inLanguage": "pt-BR",
  "publisher": { "@id": "https://exemplo.com.br/#org" }
}
```

**VETADO** — `potentialAction`/`SearchAction`: rich result morto (ver `schematize-seo`). A busca interna existe sem marcação.

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

## Validação

Obrigatória antes de publicar (Rich Results Test, Schema Markup Validator, Ações manuais no Search Console): método e penalizações em `schematize-seo → references/dados-estruturados.md`.

---

## Checklist (dados estruturados, por página)

- [ ] O tipo **certo** para a página está marcado (mapa acima).
- [ ] `Organization` única, reusada por `@id`; `ContactPoint` sem telefone divergente.
- [ ] `BreadcrumbList` em toda página com hierarquia, espelhando o breadcrumb **visível**.
- [ ] **Sem** `FAQPage`/`HowTo`/`SearchAction`; `LocalBusiness` só com endereço real (NAP consistente).
- [ ] `Service`/`Product` no detalhe; `Offer`/preço só se visível; **sem** avaliação inventada.
- [ ] `Article` com autor real e data verdadeira.
- [ ] `@id` absolutos, datas ISO 8601, URLs absolutas, `inLanguage` = `<html lang>`.
- [ ] Passou no Rich Results Test e no Schema Validator, sem erro.
- [ ] Injeção do `<script>` no front delegada à `schematize-web`.

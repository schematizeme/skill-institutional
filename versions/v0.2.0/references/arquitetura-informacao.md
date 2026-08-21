# Arquitetura de Informação / Inventário de Páginas — Site Institucional

> Parte da skill **schematize-institutional**. Governa **quais páginas** um site institucional
> precisa ter, a **hierarquia de URL**, a **navegação** (menu/rodapé) e o que é **baseline
> obrigatório** vs **recomendado** vs **opcional**. A **implementação** dessas rotas no frontend
> (App Router/Astro, layout, a11y) delega ao `schematize-web`; a **estratégia** de qual conteúdo
> rankeia (intenção, keywords, clusters) delega ao `schematize-seo`. Aqui é o **mapa do site**.

Convenção: **MUST** = regra (desvio bloqueia ou exige ADR); **SHOULD** = padrão (desvio justificado);
**VETADO** = piso, sem exceção. **Baseline** = obrigatório no site institucional da casa;
**Recomendado** = quase sempre entra; **Opcional** = por fit.

---

## Princípios de arquitetura de informação

**MUST**
- **Profundidade ≤ 3 cliques** da Home a qualquer página. Estrutura hub-and-spoke: índices (hub) →
  detalhes (spoke). Serviços é hub → cada serviço é spoke; Legal é hub → cada política é spoke.
- **URL legível, estável, em minúsculas, com hífen**, sem parâmetros de tracking na canônica, sem
  extensão (`/sobre`, não `/sobre.html`). URL reflete a hierarquia (`/servicos/consultoria`).
- **Uma intenção por página** (piso da `schematize-seo`): a Home não é a página de serviço, o índice
  de serviços não é o detalhe. Não empilhe intenções numa URL só.
- **Navegação previsível**: menu principal com os hubs (Home, Sobre, Serviços, Blog/Notícias,
  Contato); rodapé com Legal (todas as políticas), contato, redes e o Mapa do site.
- **Breadcrumb visível** em toda página com hierarquia (espelhado no `BreadcrumbList` JSON-LD).

**SHOULD**
- Idioma no caminho quando multi-idioma (`/pt/...`, `/en/...`) — o desenho de i18n com URL por
  idioma é da `schematize-web`; a decisão de **quais** idiomas é input do scaffold.
- CTA de conversão ("Fale conosco", "Peça um orçamento") acessível de toda página (header/rodapé).

**VETADO** (piso da skill)
- Site institucional sem o **baseline** abaixo. Sem página de privacidade, sem índice legal, sem
  sitemap → não é site institucional pronto, é rascunho.
- **Página de erro que responde 200** (soft-404). A tela diz "não encontrado" e o crawler indexa
  como conteúdo válido — é o defeito que passa na revisão visual porque *parece* certo na tela.
- **Página de erro sem nenhum link.** Quem errou o caminho fica num beco sem saída.
- Ir ao ar sem passar pelo **gate de go-live** (`/institutional-golive`).
- Emoji na estrutura de navegação/cards/títulos — use **ícones** (regra da casa; refino na `web`).

---

## Inventário BASELINE (obrigatório)

Toda página baseline é self-canonical, entra no `sitemap.xml`, tem `<title>`/meta/H1 únicos e o
JSON-LD do seu tipo (ver `dados-estruturados.md`).

| Página | URL sugerida | Papel | JSON-LD | Conteúdo (ver `conteudo-paginas.md`) |
|---|---|---|---|---|
| **Home** | `/` | porta de entrada, resumo do valor, caminhos pros hubs | `WebSite` (+`SearchAction` se houver busca) + `Organization` | hero, prova, serviços em destaque, CTA |
| **Quem somos / Sobre** | `/sobre` | identidade, história, missão, time | `Organization` / `AboutPage` | história, missão/valores, time, números |
| **Serviços/Produtos (índice)** | `/servicos` | hub que lista todos os serviços/produtos | `BreadcrumbList` + `ItemList` | grade de serviços, cada um linkando o detalhe |
| **Serviço/Produto (detalhe)** | `/servicos/[slug]` | 1 página por serviço/produto | `Service` (ou `Product`) + `BreadcrumbList` | o que é, para quem, como funciona, CTA, FAQ do serviço |
| **Legal (índice)** | `/legal` | hub que lista todas as páginas legais | `BreadcrumbList` | links pras políticas, data de vigência |
| **Termos de uso** | `/legal/termos-de-uso` | regras de uso do site | `BreadcrumbList` | ver `paginas-legais.md` |
| **Termos de serviço** | `/legal/termos-de-servico` | contrato do serviço/produto | `BreadcrumbList` | ver `paginas-legais.md` |
| **Política de privacidade** | `/legal/privacidade` | tratamento de dados (LGPD) | `BreadcrumbList` | ver `paginas-legais.md` |
| **Política de cookies** | `/legal/cookies` | cookies + consentimento | `BreadcrumbList` | ver `paginas-legais.md` |
| **Política de devolução** | `/legal/devolucao` | troca/devolução (se vende) | `BreadcrumbList` | ver `paginas-legais.md` |
| **Política de frete** | `/legal/frete` | envio/prazos (se vende físico) | `BreadcrumbList` | ver `paginas-legais.md` |
| **Política de estorno/reembolso** | `/legal/estorno` | reembolso (se vende pago) | `BreadcrumbList` | ver `paginas-legais.md` |
| **Contato** | `/contato` | como falar com a empresa | `ContactPage` + `ContactPoint` | formulário, canais, endereço, mapa |
| **Mapa do site (HTML)** | `/mapa-do-site` | lista humana de todas as páginas | `BreadcrumbList` | links hierárquicos pra tudo |
| **Página 404** | qualquer URL inexistente | erro com caminho de volta — e com **status 404 de verdade** | — | ver `conteudo-paginas.md` |
| **Página 500** | falha do servidor | erro honesto, sem stack trace, com canal de contato | — | ver `conteudo-paginas.md` |
| **sitemap.xml + robots.txt** | `/sitemap.xml`, `/robots.txt` | rastreabilidade (máquina) | — | ver `sitemap-robots.md` |

> **Nota sobre as políticas de e-commerce (devolução, frete, estorno):** são **baseline SE houver
> venda** (produto físico/serviço pago diretamente no site). Se o site é **puramente institucional**
> (não vende, só apresenta), elas viram **opcionais** — mas mantenha **Termos de uso, Termos de
> serviço, Privacidade e Cookies** sempre (essas quatro são baseline em qualquer caso). O
> `/institutional-scaffold` pergunta "é e-commerce?" pra decidir. **Frete** só se envia produto
> físico; **devolução/estorno** se há compra. Ver `paginas-legais.md`.

---

## Inventário RECOMENDADO (quase sempre entra)

| Página | URL sugerida | Quando | JSON-LD |
|---|---|---|---|
| **FAQ / Perguntas frequentes** | `/faq` | quando há dúvidas recorrentes (quase sempre) | `FAQPage` (só se visível) + `BreadcrumbList` |
| **Localização / Onde estamos** | `/onde-estamos` | quando há **endereço físico** / atendimento presencial | `LocalBusiness` + `BreadcrumbList` |
| **Blog / Notícias (índice)** | `/blog` ou `/noticias` | quando produz conteúdo editorial (forte pra SEO/AIO) | `Blog` + `BreadcrumbList` |
| **Post do blog (detalhe)** | `/blog/[slug]` | 1 por artigo | `Article`/`BlogPosting` + `BreadcrumbList` |

---

## Inventário OPCIONAL (por fit)

| Página | URL sugerida | Quando entra |
|---|---|---|
| **Trabalhe conosco / Carreiras (índice)** | `/carreiras` | contrata / quer employer branding |
| **Vaga (detalhe)** | `/carreiras/[slug]` | há vagas abertas (`JobPosting` JSON-LD) |
| **Depoimentos / Cases / Portfólio** | `/cases` | prova social / trabalhos anteriores |
| **Parceiros / Clientes** | `/parceiros` | ecossistema de parceiros/logos |
| **Imprensa / Press kit** | `/imprensa` | assessoria, kit de mídia, releases |
| **Acessibilidade (declaração)** | `/acessibilidade` | declaração de conformidade WCAG (recomendado p/ órgãos/gov) |
| **Política de segurança / relato de vulnerabilidade** | `/.well-known/security.txt` + `/seguranca` | há produto digital / bug bounty |
| **Status / Uptime** | `status.<dominio>` | há serviço online com SLA |
| **Newsletter / Assine** | `/newsletter` | captura de e-mail (exige base legal LGPD) |

> **Regra de decisão:** comece pelo **baseline**, adicione **recomendado** conforme o negócio, e só
> então **opcional** por fit. Não inflar o site com páginas thin (uma página fraca por seção é pior
> que não ter — ver `schematize-seo` anti-thin). Cada página nova precisa de **uma intenção** e
> conteúdo real.

---

## Navegação (menu e rodapé)

**Menu principal (header)** — os hubs de descoberta:
`Home` · `Sobre` · `Serviços` · `Blog/Notícias` (se houver) · `Contato` · CTA de conversão.

**Rodapé (footer)** — o cinturão institucional + legal:
- Coluna institucional: Sobre, Carreiras, Imprensa, Parceiros.
- Coluna legal: **todas** as páginas de `/legal/*` (Termos de uso, Termos de serviço, Privacidade,
  Cookies, e as de e-commerce se houver) + link pro índice `/legal`.
- Coluna contato: e-mail, telefone/WhatsApp, endereço (se físico), redes sociais.
- Linha final: razão social + CNPJ (BR), © ano, **Mapa do site**, Acessibilidade.

**MUST** — as páginas legais são alcançáveis do **rodapé de toda página** (padrão institucional e
requisito prático de LGPD/consumidor: a política precisa ser fácil de achar).

---

## Hierarquia de URL (exemplo canônico)

```
/                          Home
/sobre                     Quem somos
/servicos                  Serviços (índice)
/servicos/[slug]           Serviço (detalhe)
/blog                      Blog (índice)          [recomendado]
/blog/[slug]               Post (detalhe)
/faq                       FAQ                     [recomendado]
/onde-estamos              Localização             [se endereço físico]
/carreiras                 Carreiras (índice)       [opcional]
/carreiras/[slug]          Vaga (detalhe)
/contato                   Contato
/legal                     Legal (índice)
/legal/termos-de-uso       Termos de uso
/legal/termos-de-servico   Termos de serviço
/legal/privacidade         Política de privacidade
/legal/cookies             Política de cookies
/legal/devolucao           Política de devolução    [se e-commerce]
/legal/frete               Política de frete         [se envia físico]
/legal/estorno             Política de estorno       [se e-commerce]
/mapa-do-site              Mapa do site (HTML)
/sitemap.xml               Sitemap (máquina)
/robots.txt                Robots
```

Multi-idioma: prefixe com o idioma (`/en/about`, `/en/legal/privacy`) — o **como** (i18n com URL por
idioma, roteamento) é da `schematize-web`; o hreflang recíproco é da `schematize-seo`. Aqui só se
decide **que** cada página existe em cada idioma escolhido.

---

## Checklist de inventário (pré-construção)

- [ ] **Baseline** completo: Home, Sobre, Serviços (índice + detalhe), Legal (índice + subpáginas
      aplicáveis), Contato, Mapa do site, sitemap.xml, robots.txt.
- [ ] As **4 legais sempre-presentes** (Termos de uso, Termos de serviço, Privacidade, Cookies)
      estão no inventário; as de e-commerce (devolução/frete/estorno) entram **se** vende.
- [ ] Cada serviço/produto tem **uma** página de detalhe (não empilhado numa página só).
- [ ] Hierarquia ≤ 3 cliques; URLs legíveis, minúsculas, com hífen, self-canonical.
- [ ] Menu (hubs) e rodapé (institucional + **todas** as legais + contato) definidos.
- [ ] Breadcrumb visível planejado em toda página com hierarquia.
- [ ] Idiomas decididos; cada página existe em cada idioma escolhido (i18n → `web`, hreflang → `seo`).
- [ ] Páginas **recomendadas/opcionais** avaliadas por fit (não inflar com thin).
- [ ] Inventário gravado no `<projeto>_archive/` (o rastro).

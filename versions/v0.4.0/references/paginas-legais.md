# Páginas Legais — SCAFFOLD / Estrutura (NÃO é aconselhamento jurídico)

> **Fronteira com as irmãs:** aqui é a **estrutura jurídica** das páginas legais (seções,
> placeholders, pontos LGPD). A **redação otimizada** e a estratégia de indexação delas são da
> `schematize-seo`; o **layout, a a11y e o consentimento de cookies em runtime** são da
> `schematize-web` — e a **spec do banner** está lá, em `references/observabilidade.md` §49.4 (nada
> não essencial antes da escolha · aceitar e recusar com o mesmo peso · categorias · registro
> auditável · revogação que apaga · sem dark pattern · e as categorias **iguais** às da política
> daqui). Medido em 2026-08-21: **0%** de linha substantiva idêntica à `schematize-seo` —
> a sobreposição entre as duas é temática, e é por isso que esta fronteira fica escrita.
>
> Parte da skill **schematize-institutional**. Este reference provê a **ESTRUTURA** das páginas
> legais de um site institucional: as seções, os placeholders e os **pontos obrigatórios** que cada
> política precisa cobrir. **NÃO é aconselhamento jurídico.**

## Aviso obrigatório (piso da skill)

**Esta skill entrega SCAFFOLD, não texto jurídico válido.** O conteúdo aqui é um **esqueleto** com
placeholders e uma lista de pontos que costumam ser obrigatórios — **não** substitui a análise de
um(a) advogado(a) e **não** garante conformidade legal.

- **VETADO** apresentar qualquer minuta legal como "pronta para publicar".
- Todo texto legal gerado sai marcado `[REVISAR: advogado]` nos pontos que exigem decisão jurídica.
- A **responsabilidade jurídica** do conteúdo publicado é do **dono do site**, que deve submeter as
  páginas a **revisão por advogado(a)** antes de ir ao ar.
- As leis variam por país/estado e mudam com o tempo. O foco aqui é **Brasil/LGPD** (base padrão da
  casa); operação em outras jurisdições (GDPR na UE, CCPA na Califórnia etc.) exige adaptação
  jurídica específica — também `[REVISAR: advogado]`.

Com isso claro, seguem os scaffolds.

---

## Metadados comuns a toda página legal

Toda política precisa, no topo ou rodapé do documento:
- **Razão social + CNPJ** (BR) da empresa (o "controlador"/fornecedor).
- **Data de vigência / última atualização** (`Vigente desde: [DATA]`).
- **Contato** para questões sobre aquele documento.
- Link para o **índice legal** (`/legal`) e para as políticas irmãs.

JSON-LD: `BreadcrumbList` (Legal → [política]). Não há tipo schema.org específico para "termos";
não inventar rich result. Ver `dados-estruturados.md`.

---

## Índice Legal (`/legal`)

Hub que lista **todas** as páginas legais aplicáveis, cada uma com título, resumo de 1 linha e data
de vigência. É a porta única para as políticas (linkada no rodapé de todo o site).

---

## 1. Termos de Uso (`/legal/termos-de-uso`)

Regras de uso **do site** (navegação, propriedade intelectual, conduta). Distinto dos Termos de
Serviço (que regem o produto/serviço contratado).

**Seções (scaffold)**
1. Aceitação dos termos e quem pode usar o site.
2. Objeto: o que o site oferece.
3. Propriedade intelectual (marca, conteúdo, licença de uso).
4. Conduta do usuário / usos proibidos.
5. Conteúdo de terceiros e links externos.
6. Isenção de garantias e limitação de responsabilidade. `[REVISAR: advogado]`
7. Alterações dos termos.
8. Lei aplicável e foro. `[REVISAR: advogado]`
9. Contato.

---

## 2. Termos de Serviço (`/legal/termos-de-servico`)

O **contrato** do serviço/produto: o que é entregue, obrigações das partes, pagamento, cancelamento.

**Seções (scaffold)**
1. Definições e partes.
2. Descrição do serviço/produto e escopo.
3. Cadastro/conta e requisitos de elegibilidade.
4. Preços, pagamento, renovação e reajuste. `[REVISAR: advogado]`
5. Obrigações do cliente e da empresa.
6. Nível de serviço / disponibilidade (SLA, se houver).
7. Suspensão e rescisão.
8. Garantias, limitação de responsabilidade e indenização. `[REVISAR: advogado]`
9. Vínculo com Devolução, Frete, Estorno (se e-commerce) e Privacidade.
10. Lei aplicável e foro. `[REVISAR: advogado]`

---

## 3. Política de Privacidade (`/legal/privacidade`) — LGPD

**Pontos OBRIGATÓRIOS (piso da skill — a página não fecha sem eles):**
1. **Controlador**: quem trata os dados (razão social, CNPJ, contato).
2. **Encarregado / DPO**: nome/canal de contato do encarregado (art. 41 LGPD).
3. **Dados coletados**: quais dados pessoais (cadastro, navegação, cookies, formulários).
4. **Finalidade**: para que cada dado é usado.
5. **Base legal**: o fundamento do art. 7º LGPD para cada tratamento (consentimento, execução de
   contrato, legítimo interesse, obrigação legal…). `[REVISAR: advogado]`
6. **Compartilhamento**: com quem (operadores, parceiros, autoridades) e por quê.
7. **Transferência internacional** (se houver — ex.: provedores fora do Brasil). `[REVISAR: advogado]`
8. **Retenção**: por quanto tempo os dados são guardados e o critério.
9. **Segurança**: medidas de proteção (em linhas gerais).
10. **Direitos do titular** (art. 18): confirmação, acesso, correção, anonimização, portabilidade,
    eliminação, informação sobre compartilhamento, revogação de consentimento — **e como exercê-los**
    (canal + prazo).
11. **Cookies**: referência à Política de Cookies.
12. **Menores**: tratamento de dados de crianças/adolescentes (art. 14), se aplicável. `[REVISAR: advogado]`
13. **Alterações** da política e **data de vigência**.

> Sem os pontos 1–13 (mínimo: controlador, encarregado, dados, finalidade, base legal, retenção,
> direitos e como exercê-los), a página **não é marcada como pronta**. Ainda assim, `[REVISAR: advogado]`.

---

## 4. Política de Cookies (`/legal/cookies`) — LGPD + consentimento

**Pontos OBRIGATÓRIOS:**
1. **O que são cookies** e tecnologias similares.
2. **Categorias**: essenciais/necessários, desempenho/analytics, funcionais, marketing/publicidade.
3. **Tabela de cookies**: nome, finalidade, duração, primeira/terceira parte. `[REVISAR: negócio]`
4. **Base legal / consentimento**: os **não-essenciais exigem consentimento opt-in**.
5. **Como gerenciar/revogar**: banner/central de preferências + configurações do navegador.
6. **Data de vigência.**

**Regra de consentimento (piso):** o site **não dispara** cookies não-essenciais (analytics,
marketing) **antes** do aceite. Banner com opção real de **recusar** tão fácil quanto **aceitar**;
essenciais podem rodar sem consentimento. A **implementação** do banner/consent-mode (bloqueio de
scripts até consentir) delega à `schematize-web`; **aqui** se define a **política e as categorias**.

---

## 5. Política de Devolução (`/legal/devolucao`) — se e-commerce

Troca e devolução de produtos/serviços. No BR, ver **direito de arrependimento** (CDC art. 49: 7
dias em compra fora do estabelecimento). `[REVISAR: advogado]`

**Seções (scaffold)**
1. Prazo de devolução/troca e condições (produto sem uso, embalagem etc.).
2. Direito de arrependimento (compra online). `[REVISAR: advogado]`
3. Como solicitar (canal, passo a passo).
4. Quem paga o frete de devolução.
5. Prazo e forma de reembolso/troca (liga com Estorno).
6. Exceções (produtos personalizados, perecíveis, digitais).

---

## 6. Política de Frete (`/legal/frete`) — se envia produto físico

**Seções (scaffold)**
1. Regiões atendidas.
2. Prazos de entrega (por região/modalidade).
3. Custos e formas de cálculo do frete; frete grátis (se houver).
4. Rastreamento.
5. Extravio/atraso: o que fazer.
6. Retirada no local (se houver).

---

## 7. Política de Estorno / Reembolso (`/legal/estorno`) — se venda paga

**Seções (scaffold)**
1. Quando cabe reembolso (arrependimento, defeito, cancelamento, cobrança indevida).
2. Prazos de estorno por método (cartão, Pix, boleto). `[REVISAR: negócio]`
3. Reembolso total vs parcial e critérios.
4. Como solicitar e acompanhar.
5. Vínculo com Devolução e Termos de Serviço.

---

## Matriz: quais legais são obrigatórias

| Página legal | Sempre | Só se e-commerce / venda |
|---|---|---|
| Termos de uso | **sim** | |
| Termos de serviço | **sim** | |
| Política de privacidade (LGPD) | **sim** | |
| Política de cookies | **sim** (se usa cookies — quase todo site) | |
| Política de devolução | | **sim**, se vende |
| Política de frete | | **sim**, se envia físico |
| Política de estorno/reembolso | | **sim**, se venda paga |

---

## Checklist (páginas legais)

> **Convenção de checklist da casa (3 classes).** `- [ ]` é item de **máquina** (o modelo fecha, com
> prova); **`- [H ]` é de humano** — decisão jurídica, dado real do negócio, aprovação — e o modelo
> **não o marca**; `- [~]` é **on-hold** (parkeado por dúvida, com o motivo escrito). Misturar as
> três numa lista só de `- [ ]` é o que faz um checklist "fechado" esconder exatamente o que ninguém
> verificou.

- [ ] Aviso interno registrado: **é scaffold, não aconselhamento jurídico**; pontos jurídicos
      marcados `[REVISAR: advogado]`.
- [ ] Índice legal (`/legal`) lista todas as políticas aplicáveis; linkado no rodapé de todo o site.
- [ ] As 4 sempre-presentes existem: Termos de uso, Termos de serviço, Privacidade, Cookies.
- [ ] Devolução/Frete/Estorno presentes **se** o site vende (matriz acima).
- [ ] **Privacidade** cobre os pontos LGPD 1–13 (mínimo: controlador, encarregado, dados,
      finalidade, base legal, retenção, direitos + como exercer).
- [ ] **Cookies** define categorias + consentimento opt-in dos não-essenciais; banner delegado à `web`.
- [H ] Cada política tem razão social/CNPJ, data de vigência e contato — os **dados reais** vêm do dono do site (`[REVISAR: negócio]`), não do gerador.
- [ ] `BreadcrumbList` no JSON-LD de cada uma; **nenhum** rich result inventado.
- [H ] Encaminhado para **revisão por advogado(a)** antes de publicar. *(Item de **humano**: nenhum modelo fecha este — e um checklist que deixa uma pessoa marcá-lo por conta própria está mentindo sobre o que foi verificado.)*

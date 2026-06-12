# CLAUDE.md — Memória do projeto Prospera Landing

> Este arquivo serve de **memória** para as próximas sessões de trabalho neste
> repositório. Leia-o no início de cada sessão. O dono do projeto é **iniciante
> em programação** e se comunica em **português (PT-BR)** — explique tudo de
> forma simples e trabalhe com calma.

---

## 1. O que é este projeto

Site institucional da **Prospera Assessoria e Consultoria Contábil**, um
escritório de contabilidade de **Capinzal/SC** focado em prestadores de serviço
no Simples Nacional.

- **Repositório:** `Boaretto-JAB/prospera-landing` (GitHub)
- **Hospedagem:** GitHub Pages (publicação automática a cada `git push` na branch `main`)
- **Domínio:** https://prospera-contabil.com (HTTPS ativo; arquivo `CNAME` define o domínio)
- **Sem etapa de build:** cada página é um arquivo `.html` único e autocontido
  (CSS e JavaScript embutidos no próprio arquivo; logo e favicon embutidos em base64).

Depois de um `git push`, o GitHub Pages publica sozinho em **~1 minuto**. Não há
outro passo de deploy.

---

## 2. Arquivos do repositório

| Arquivo | O que é |
|---|---|
| `index.html` | Landing page principal (~676 linhas). |
| `calculadora.html` | Calculadora do Simples Nacional para prestadores de serviço (~351 linhas). |
| `guia-cnpj.html` | Página "Guia do CNPJ" — conteúdo educativo para quem abriu empresa (~236 linhas). |
| `CNAME` | Contém `prospera-contabil.com` (config do domínio no GitHub Pages). |
| `CLAUDE.md` | Este arquivo (memória do projeto). |
| `README.md` | Resumo curto do projeto. |

### ⚠️ Linhas de base64 (NÃO editar)
O logo e o favicon estão embutidos como base64 em **linhas únicas muito longas**.
**Nunca recrie nem recodifique esse base64** — preserve exatamente como está.
Ao ler os arquivos, pule essas linhas para economizar contexto:

- `index.html`: linha **10** (favicon), linhas **351** e **407** (logo)
  — ⚠️ essas posições deslizam quando o arquivo é editado; confirme com
  `awk '{ if (length($0) > 900) print NR }' index.html` antes de confiar nelas
- `calculadora.html`: linha **8** (favicon), linha **120** (logo)
- `guia-cnpj.html`: linha **8** (favicon), linha **109** (logo)

### Página Guia do CNPJ (`guia-cnpj.html`)
Conteúdo educativo, no mesmo padrão visual do site. Foi **gerada** reaproveitando o
favicon e o logo da `calculadora.html` (extraídos por script, para não recriar o
base64). Tem um índice + **7 temas** do manual de boas-vindas: (01) pró-labore ×
distribuição de lucros — com link para a calculadora, (02) golpes/boletos falsos,
(03) avisar antes de mudar a empresa, (04) como/quando se paga o Simples (o DAS),
(05) notas fiscais, (06) certificado digital (e-CNPJ), (07) guarda de documentos por
5 anos. Para editar, abra o arquivo e pule as linhas de base64 (8 e 109).

**Acesso:** o Guia está no **menu** (desktop e mobile, após "Calculadora do Simples"),
no **rodapé** e ao **final da seção "Dúvidas"** da home. A calculadora também está no
rodapé.

---

## 3. Identidade visual (manter sempre)

Estilo **clássico e elegante**; tema claro (marfim) com painéis azul-marinho.

- **Fontes (Google Fonts):**
  - `Cinzel` → wordmark/títulos da marca (estilo Trajan da logo)
  - `Cormorant Garamond` → títulos display e textos em itálico
  - `EB Garamond` → corpo do texto
- **Cores (variáveis CSS `:root`):**
  - navy `#12436C`, navy-deep `#0E3556`, navy-soft `#1C5586`
  - ink `#16181D`, paper/marfim `#F7F4EE`, branco `#FFFFFF`
  - linha `#E2DCCF`, WhatsApp `#25D366`
- **Logo:** símbolo de dois triângulos entrelaçados (marinho + preto), em base64.
- Sempre **responsivo** (mobile-first), **acessível** e com **animações suaves**
  que respeitam `prefers-reduced-motion`.

---

## 4. Estrutura da `index.html`

- **Header fixo** com navegação alinhada à direita: Início, Sobre, Serviços, Calculadora do Simples, Guia do CNPJ, Dúvidas, Contato. Vira opaco ao rolar (`.scrolled`). Com 7 itens, vira **menu mobile (hambúrguer) em telas ≤1100px** (regra separada do breakpoint de 980px, que cuida do layout do hero/serviços). O WhatsApp fica **só no botão flutuante** (canto inferior direito), não no header.
- **Hero:** headline _"Tecnologia e experiência transformando números em sucesso."_ + placa da marca.
- **Sobre (01):** texto de apresentação (inclui os sócios com **mais de 15 anos cada** em contábil, fiscal, departamento pessoal, gestão financeira e controladoria) + 3 pilares: **Tecnologia** (destaca os **agentes de IA** — conferência de cálculos, automação, controle de CNDs, notas fiscais, auditorias), **Experiência**, **Sucesso**. _Ideia futura do dono: uma página dedicada aos fundadores/equipe._
- **Serviços (02):** 6 cards (Contabilidade; Fiscal e Tributário; Departamento Pessoal; Abertura e Regularização; Planejamento Tributário; Consultoria Financeira).
- **FAQ / Dúvidas (03):** 6 perguntas em acordeão. Ao final, um link para o **Guia do CNPJ** (usa a classe `.services-note`). Obs.: os temas pró-labore × lucros, golpes/boletos e mudanças na empresa **saíram do FAQ** e viraram seções do Guia (para não duplicar). Links dentro das respostas usam a regra `.faq-a a`.
- **Contato:** painel marinho com CTA + cartão de contatos.
- **Footer** + **botão flutuante de WhatsApp**.
- **JavaScript no fim:** ano automático no rodapé, header ao rolar, menu mobile, acordeão do FAQ e animações de entrada (`IntersectionObserver`, respeitando `prefers-reduced-motion`).

### Dados de contato usados no site (manter consistentes)
- **WhatsApp:** (49) 99840-0684 → `https://wa.me/5549998400684`
- **E-mail:** contato@prospera-contabil.com
- **Instagram:** @prospera.contabil → `https://instagram.com/prospera.contabil`
- **Endereço:** Rua João Caldart, 129 – Apto. 302, Capinzal/SC
- **Horário:** Segunda a sexta, das 8h às 18h

> **Navegação para a calculadora:** o menu (desktop e mobile) tem o item
> **"Calculadora do Simples"**, logo após "Serviços", apontando para `calculadora.html`.

---

## 5. Calculadora (`calculadora.html`) — regras fiscais

Calcula, a partir de poucos campos, o **DAS**, o **pró-labore líquido** e quanto
**sobra para o sócio**. Resultado atualiza em tempo real (evento `input`).
Todo o cálculo está num `<script>` no fim do arquivo. Valores **vigentes em 2026**.

**Campos do formulário:** abrem **em branco** (placeholder `0,00`); campo vazio
é tratado como **zero** no cálculo, então a página inicia com tudo "R$ 0,00".
O botão de Anexo (III/V) inicia em **III**.
- Faturamento mensal médio
- Pró-labore bruto _(dica no campo: mínimo 1 salário, R$ 1.621,00)_
- Folha de funcionários (salário base)
- Despesas diversas

**Fórmulas (não quebrar):**
- **DAS** = faturamento do mês × **alíquota efetiva**
- **Alíquota efetiva** = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12
- **RBT12** = faturamento mensal × 12
- **Tabelas Anexos III e V (2026)** estão no JS (`ANEXO_III`, `ANEXO_V`).
- **Fator R** = (pró-labore + folha + encargos) ÷ faturamento.
  No **Anexo V**, se **Fator R ≥ 28%**, a tributação migra para o **Anexo III**
  (mais barato). Anexo III escolhido permanece III.
- **INSS pró-labore:** 11%, teto **R$ 8.475,55** (máx R$ 932,31).
- **IRPF (Lei 15.270/2025):**
  - isento até **R$ 5.000/mês**;
  - de R$ 5.000,01 a R$ 7.350 → redutor = `978,62 − 0,133145 × rendimento`;
  - acima de R$ 7.350 → tabela progressiva cheia (`TABELA_IR`).
- **Encargos da folha ≈ 29%** (FGTS 8% + 13º + férias + 1/3 + FGTS sobre provisões).

**Conferência (cenário de teste, já validado):** digitando faturamento R$ 27.000,
Anexo III, pró-labore R$ 1.621, folha R$ 0 e despesas R$ 350
→ **DAS R$ 2.244,00** (alíquota 8,3111%) e **líquido ao sócio R$ 24.227,69**.
_(Sem despesas, o líquido seria R$ 24.577,69.)_ Use este caso para revalidar a
lógica depois de mexer no JS.

> ⚠️ **IMPORTANTE:** esses números mudam por ano e por lei. **Antes de alterar
> QUALQUER valor fiscal**, pesquise e confirme a regra vigente e **informe a fonte**
> ao dono. Mantenha sempre o aviso de _"estimativa, não substitui a apuração oficial"_.
> Depois de mexer no JS da calculadora, **revalide** a lógica com o exemplo de conferência.

---

## 6. Como trabalhar (fluxo a cada pedido)

1. Edite o **arquivo certo** (`index.html` ou `calculadora.html`).
2. Faça um **commit pequeno** com mensagem clara em português, usando prefixo:
   - `feat:` (novidade), `fix:` (correção), `content:` (texto/conteúdo), `style:` (visual).
3. `git push` na branch **main**.
4. Avise o dono **o que mudou**; o GitHub Pages publica em ~1 min.

**Nunca:**
- Quebrar o base64 do logo/favicon.
- Quebrar o design ou a responsividade.
- Tocar em **DNS**, **e-mail (Google Workspace)** ou configurações da conta do GitHub.

**Sempre:**
- Validar a lógica da calculadora depois de mexer nela.
- Explicar as mudanças de forma simples (dono é iniciante).
- Só alterar o que foi pedido.

---

## 7. Ambiente local

- Repositório clonado em: `~/Projetos/prospera-landing`
- `git` e `gh` (GitHub CLI) instalados; já autenticado como `Boaretto-JAB`.
- Para testar localmente, basta abrir o `.html` no navegador (não precisa de servidor).

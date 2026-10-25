# CLAUDE.md — Memória do projeto Prospera Landing

> Este arquivo serve de **memória** para as próximas sessões de trabalho neste
> repositório. Leia-o no início de cada sessão. O dono do projeto é **iniciante
> em programação** e se comunica em **português (PT-BR)** — explique tudo de
> forma simples e trabalhe com calma.
>
> 📌 **Regra permanente para os agentes:** a cada mudança no código ou no conteúdo,
> **atualize este CLAUDE.md e o README.md no mesmo commit (ou no commit seguinte)**,
> para que eles sempre reflitam o estado atual do site. Faça commits pequenos e
> frequentes. Este é um projeto pessoal do dono: pode dar push direto na `main`
> (exceto posts do blog, que vão por PR — ver seção 7).

> 🆕 **23/10/2026 — grande atualização (comparação com o site da Contplan):**
> nome padronizado **"Prospera Consultoria Contábil"** (igual ao CNPJ); rodapé com
> CNPJ e CRC das responsáveis técnicas; botão **Área do cliente** → Portal do Cliente
> do Onvio (`https://onvio.com.br`); prévia de link no WhatsApp/redes (`og:image`) +
> dados estruturados para o Google + `robots.txt`/`sitemap.xml`; contador de visitas
> **GoatCounter** (sem cookies); home com **faixa de destaques**, seção **Tecnologia**,
> formulário **"Peça uma proposta"** (abre o WhatsApp); calculadora com botão
> **"Enviar esta simulação"** e a regra dos **lucros acima de R$ 50 mil/mês**;
> **4 páginas "Contabilidade para…"**; **gerador do site** (`_scripts/build.mjs`) e
> **blog** com post semanal automático em **rascunho + aprovação** (PR).
> Correção: o topo da home ficava em branco para quem usa "reduzir movimento".

---

## 1. O que é este projeto

Site institucional da **Prospera Consultoria Contábil** (razão social: Prospera
Consultoria Contábil Ltda, CNPJ 58.525.311/0001-54), escritório de contabilidade de
**Capinzal/SC** focado em prestadores de serviço no Simples Nacional.

- **Repositório:** `Boaretto-JAB/prospera-landing` (GitHub, público)
- **Hospedagem:** GitHub Pages (publicação automática a cada `git push` na `main`, ~1 min)
- **Domínio:** https://prospera-contabil.com (arquivo `CNAME`)
- O GitHub Pages roda o Jekyll por padrão: arquivos/pastas que começam com `_` **não**
  são publicados, e o `_config.yml` tira `CLAUDE.md` e `README.md` do site.
- **Não há build no servidor.** As páginas geradas (ramos e blog) são produzidas
  **localmente** por `node _scripts/build.mjs` e commitadas junto com o `.md`.

---

## 2. Arquivos do repositório

| Arquivo / pasta | O que é | Edita como? |
|---|---|---|
| `index.html` | Home (landing). | À mão — **exceto** os trechos entre marcadores `<!-- BLOG:… -->` / `<!-- RAMOS:… -->`, que o build reescreve. |
| `calculadora.html` | Calculadora do Simples Nacional. | À mão. |
| `guia-cnpj.html` | Guia do CNPJ (7 temas educativos). | À mão. |
| `contabilidade-para-*.html` | 4 páginas de ramo. | **Geradas** — edite `_conteudo/ramos/*.md` e rode o build. |
| `blog/` | Lista do blog, posts e `feed.xml`. | **Gerados** — edite `_conteudo/blog/*.md` e rode o build. |
| `sitemap.xml` | Mapa do site para o Google. | **Gerado** pelo build. |
| `robots.txt` | Libera o site para buscadores e aponta o sitemap. | À mão (raramente). |
| `assets/` | `logo.png`, `favicon.png` (extraídos do base64, mesmos bytes), `og-image.jpg` (1200×630, prévia de link), `pagina.css`/`pagina.js` (páginas geradas), `contador.js` (cliques). | À mão. |
| `_conteudo/ramos/` | Textos das páginas "Contabilidade para…" (Markdown + cabeçalho). | À mão. |
| `_conteudo/blog/` | Posts do blog (`AAAA-MM-DD-endereco.md`). | À mão / tarefa semanal. |
| `_conteudo/GUIA-EDITORIAL-BLOG.md` | Regras de escrita e exatidão do blog, formato e pauta. | À mão. |
| `_conteudo/rascunhos/pacotes.md` | Rascunho dos pacotes (decisões pendentes das sócias). | À mão. |
| `_modelos/pagina.html` | Modelo (topo, menu, rodapé) das páginas geradas. | À mão + rodar build. |
| `_scripts/build.mjs` | Gerador. `_scripts/vendor/marked.esm.js` = conversor de Markdown (marked 15.0.12, MIT). | À mão. |
| `_config.yml` | Exclusões do Jekyll/GitHub Pages. | Cuidado: YAML inválido derruba a publicação. |
| `CNAME`, `CLAUDE.md`, `README.md` | Domínio e documentação. | À mão. |

### ⚠️ Linhas de base64 (NÃO editar)
O logo e o favicon das 3 páginas feitas à mão estão embutidos como base64 em
**linhas únicas muito longas**. **Nunca recrie nem recodifique esse base64.**
Posições atuais (deslizam quando o arquivo muda — confirme com
`awk '{ if (length($0) > 5000) print NR }' arquivo.html`):

- `index.html`: linha **10** (favicon), **447** e **509** (logo) — 1014 linhas no total
- `calculadora.html`: linha **19** (favicon), **146** (logo) — 417 linhas
- `guia-cnpj.html`: linha **19** (favicon), **124** (logo) — 253 linhas

As páginas **geradas** usam `/assets/logo.png` e `/assets/favicon.png` (mesma imagem).

---

## 3. Identidade visual (manter sempre)

Estilo **clássico e elegante**; tema claro (marfim) com painéis azul-marinho.

- **Fontes (Google Fonts):** `Cinzel` (marca/rótulos), `Cormorant Garamond` (títulos),
  `EB Garamond` (corpo).
- **Cores:** navy `#12436C`, navy-deep `#0E3556`, navy-soft `#1C5586`, ink `#16181D`,
  paper/marfim `#F7F4EE`, branco `#FFFFFF`, linha `rgba(22,24,29,.13)`, WhatsApp `#25D366`.
- **Ícone do WhatsApp:** use o caminho SVG **longo** (logo completo, ~894 caracteres, igual
  ao do botão do topo da home). O caminho curto (~695) vira uma bolha cheia.
- Sempre **responsivo**, **acessível** e com animações que respeitam
  `prefers-reduced-motion` (na home, `.hero .anim` precisa de `opacity:1` nesse modo —
  sem isso o topo some).

---

## 4. Estrutura da `index.html`

- **Header fixo**: logo + menu (Sobre, Serviços, Calculadora, Guia do CNPJ, [Blog],
  Dúvidas, Contato) + botão **Área do cliente** (Onvio). Menu vira hambúrguer em ≤1100px;
  o botão Área do cliente some em ≤760px (fica no menu do celular).
- **Hero**: headline + botões "Falar no WhatsApp" e "Peça uma proposta" (`#proposta`).
- **Faixa de destaques**: 15+ anos de experiência de cada sócia · 4 estados com clientes ·
  100% digital. (As sócias **não** querem mostrar o número de empresas por enquanto.)
- **01 Sobre** (texto fala em "as sócias") + 3 pilares.
- **02 Serviços**: 6 cards + `<!-- RAMOS:SERVICOS -->` (links das páginas de ramo).
- **03 Tecnologia a seu favor** (`#tecnologia`): Caixa Postal/DCTFWeb, certidões,
  certificado/procuração, emissor NFS-e, conferência com IA, Portal do Cliente.
  Só afirme o que de fato roda nos sistemas da Prospera.
- **Depoimentos** e **Pacotes**: blocos prontos, **comentados (fora do ar)**. Para publicar,
  ver as instruções dentro de cada comentário (pacotes: `_conteudo/rascunhos/pacotes.md`).
- `<!-- BLOG:NOVIDADES -->`: 3 posts mais recentes (só aparece quando há posts).
- **04 Dúvidas** (FAQ em acordeão) + link para o Guia.
- **05 Proposta** (`#proposta`): formulário (nome, situação, ramo, faturamento, funcionários,
  cidade, observação) que **monta a mensagem e abre o WhatsApp** — nada é guardado.
  `/?ramo=Saúde#proposta` já escolhe o ramo (usado pelas páginas de ramo).
- **Contato** (painel marinho) + **Footer** (4 colunas: marca, navegação, "Para quem
  atendemos" via `<!-- RAMOS:RODAPE -->`, contato) + linha legal com CNPJ e CRC.
- **JavaScript no fim**: ano, header ao rolar, menu mobile, FAQ, formulário de proposta,
  animações.

### Dados de contato e legais (manter consistentes em todas as páginas)
- **WhatsApp:** (49) 99840-0684 → `https://wa.me/5549998400684`
- **E-mail:** contato@prospera-contabil.com · **Instagram:** @prospera.contabil
- **Endereço:** Rua João Caldart, 129 – Apto. 302, Centro, Capinzal/SC, CEP 89665-000
- **Horário:** segunda a sexta, das 8h às 18h
- **Razão social / CNPJ:** Prospera Consultoria Contábil Ltda · 58.525.311/0001-54
- **Responsáveis técnicas:** Solange C. F. Boaretto — CRC/SC 040604/O-4 ·
  Taynara M. Bugança — CRC/SC 047426/O (a empresa não tem nº próprio informado)
- **Área do cliente:** Portal do Cliente do Onvio → `https://onvio.com.br`

---

## 5. Calculadora (`calculadora.html`) — regras fiscais

Calcula o **DAS**, o **pró-labore líquido** e quanto **sobra para o sócio**, em tempo real.
Valores **vigentes em 2026**. Campos abrem em branco (vazio = zero); Anexo começa em III.

**Fórmulas (não quebrar):**
- **DAS** = faturamento × alíquota efetiva; **efetiva** = (RBT12 × nominal − dedução) ÷ RBT12;
  **RBT12** = faturamento × 12. Tabelas `ANEXO_III`/`ANEXO_V` no JS.
- **Fator R** = (pró-labore + folha + encargos) ÷ faturamento. No Anexo V, Fator R ≥ 28% →
  tributa pelo Anexo III.
- **INSS pró-labore:** 11%, teto R$ 8.475,55. **IRPF (Lei 15.270/2025):** isento até
  R$ 5.000; redutor `978,62 − 0,133145 × rendimento` até R$ 7.350; acima, tabela cheia.
- **Encargos da folha ≈ 29%.**
- **Lucros (Lei 15.270/2025):** isentos até **R$ 50 mil/mês** por sócio; acima disso,
  **retenção de 10% sobre o total** (`LIMITE_LUCRO_ISENTO`, `ALIQ_IRRF_LUCRO`) — posição da
  Receita, tema em discussão judicial; aparece um aviso. Considera um único sócio.
- **Botão "Enviar esta simulação"** (`#waSimulacao`): monta a mensagem do WhatsApp com os
  números da tela (função `atualizarWhatsApp`).

**Conferência (revalidar depois de mexer no JS):**
- R$ 27.000, Anexo III, pró-labore R$ 1.621, folha 0, despesas R$ 350 → **DAS R$ 2.244,00**
  (8,3111%) e **líquido R$ 24.227,69** (sem despesas: R$ 24.577,69).
- R$ 100.000, Anexo III, pró-labore R$ 1.621 → lucro R$ 85.349,00, **retenção R$ 8.534,90**,
  **líquido R$ 78.256,79**.

> ⚠️ Esses números mudam por ano e por lei. **Antes de alterar qualquer valor fiscal**,
> pesquise a regra vigente e **informe a fonte** ao dono. Mantenha o aviso de
> "estimativa, não substitui a apuração oficial".

---

## 6. Páginas geradas e o build

```bash
node _scripts/build.mjs      # na raiz do repositório (Node 18+; sem npm install)
```

- Lê `_conteudo/ramos/*.md` e `_conteudo/blog/AAAA-MM-DD-*.md`, aplica `_modelos/pagina.html`
  e grava: `contabilidade-para-*.html`, `blog/` (posts, lista e `feed.xml`), `sitemap.xml` e
  os trechos marcados do `index.html` (`BLOG:NAV`, `BLOG:NOVIDADES`, `RAMOS:SERVICOS`,
  `RAMOS:RODAPE`). Apaga páginas geradas cujo `.md` sumiu.
- **Valida** os `.md` (campos obrigatórios, data, categoria, resumo ≤ 170 caracteres,
  seção `## Fontes` nos posts) e **não grava nada** se houver erro (mostra ❌ e a lista).
- O link **"Blog"** no menu e a seção **Novidades** só aparecem quando existe pelo menos 1 post.
- Cabeçalho das páginas de ramo: `titulo`, `titulo_seo`, `resumo`, `menu`, `ordem`,
  `eyebrow`, `mensagem_whatsapp`, `ramo_formulario` (tem que ser igual a uma opção do
  campo "Ramo" do formulário da home).
- Páginas de ramo atuais: Profissional PJ (exemplo do Fator R: R$ 15 mil/mês → +R$ 1.141,31),
  Saúde, Engenharia e arquitetura, TI/marketing/consultoria.

---

## 7. Blog (rascunho + aprovação)

- **Regras de escrita:** `_conteudo/GUIA-EDITORIAL-BLOG.md` (fontes oficiais obrigatórias,
  categorias, formato, pauta). Nunca citar clientes nem dados internos.
- **Posts NUNCA vão direto para a `main`.** Ficam numa branch `blog/…` com um **Pull Request
  "Blog: …"**; as sócias leem e clicam em **Merge** para publicar (~1 min).
  Cuidado com `git add -A` em outra branch enquanto há posts não commitados na pasta — foi
  assim que, em 23/10, 3 posts escaparam para a `main` por alguns minutos.
- **Tarefa agendada semanal** "Blog semanal da Prospera" (id `trig_01K3GpzZqcZoDNr4oyApcu5G`):
  toda **segunda às 7h38 (Brasília)** abre uma sessão nova que pesquisa as novidades, escreve
  1 post, roda o build e abre (ou acrescenta ao) PR pendente. Avisa o dono por push/e-mail.
- **Blog no ar desde 23/10/2026** (PR #1 aprovado pelo dono e mesclado): 3 posts — NFS-e
  Nacional em 1º/11/2026, lucros acima de R$ 50 mil, Fator R. O link "Blog" e a seção
  "Novidades" da home já aparecem.

---

## 8. Contador de visitas (GoatCounter)

- Script em todas as páginas: `https://prosperacontabil.goatcounter.com/count` (grátis, sem
  cookies → não precisa de aviso de cookies). `assets/contador.js` registra cliques no
  WhatsApp (`whatsapp`) e na Área do cliente (`area-do-cliente`); o formulário registra
  `proposta-enviada`.
- ⚠️ **Pendente do dono:** criar a conta em goatcounter.com com o código **`prosperacontabil`**
  (se o código estiver ocupado, trocar nas 3 páginas, no `_modelos/pagina.html` e aqui).

---

## 8b. Google Search Console

- Propriedade **prefixo de URL** `https://prospera-contabil.com`, verificada pela **tag HTML**
  `google-site-verification` no `<head>` do `index.html` (25/10/2026, conta
  contato@prospera-contabil.com). **Não apague essa tag** — sem ela o Google desverifica o site.
- Depois de verificar: enviar `sitemap.xml` em "Sitemaps" e pedir indexação da home e do `/blog/`.

---

## 9. Como trabalhar (fluxo a cada pedido)

1. Edite o arquivo certo (manual ou `.md` + build — ver tabela da seção 2).
2. Rode `node _scripts/build.mjs` se mexeu em `_conteudo/`, `_modelos/` ou no build.
3. Confira no navegador (as páginas geradas usam caminhos `/assets/…`, então use um
   servidor local: `npx serve .`).
4. **Commit pequeno** em português com prefixo `feat:` / `fix:` / `content:` / `style:` /
   `docs:` / `blog:`, e `git push` na `main` (blog: branch + PR).
5. **Atualize este CLAUDE.md e o README.md.**
6. Avise o dono **o que mudou**.

**Nunca:** quebrar o base64; editar à mão um `.html` gerado; publicar post sem aprovação;
tocar em DNS, e-mail (Google Workspace) ou configurações da conta do GitHub.

**Sempre:** validar a calculadora depois de mexer no JS; explicar as mudanças de forma simples.

---

## 10. Pendências (23/10/2026)

- Ler e aprovar (Merge) os PRs semanais "Blog: …" (primeiro em 26/10/2026).
- Criar a conta do **GoatCounter** (código `prosperacontabil`).
- **Search Console:** tag de verificação publicada em 25/10 → o dono clica em "Verificar",
  envia o `sitemap.xml` e pede indexação da home e do blog.
- Criar o **Perfil da Empresa no Google** (guia e textos prontos passados no chat em 25/10);
  depois, mandar o link de "Pedir avaliações" para virar um botão no site.
- **Depoimentos:** as sócias vão reunir 3–5 (com autorização) → publicar o bloco comentado.
- **Pacotes:** decidir nomes, preço no site ou não, extras e limites (`_conteudo/rascunhos/pacotes.md`).
- **Página Quem somos/Equipe** (fundadoras, CRC, trajetória) — para depois.

---

## 11. Ambiente local

- Repositório clonado em: `~/Projetos/prospera-landing` (no Mac do dono).
- `git` e `gh` instalados; autenticado como `Boaretto-JAB`. Node 18+ para o build.

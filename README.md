# Prospera — Site institucional

Site da **Prospera Consultoria Contábil** (Capinzal/SC), contabilidade para prestadores de
serviço no Simples Nacional.

🔗 **No ar em:** https://prospera-contabil.com

## Páginas

- **`index.html`** — home: apresentação, destaques, serviços, tecnologia, dúvidas,
  formulário **"Peça uma proposta"** (abre o WhatsApp) e contato. Botão **Área do cliente**
  leva ao Portal do Cliente (Onvio).
- **`calculadora.html`** — calculadora do Simples Nacional (DAS, pró-labore, Fator R,
  lucros e a retenção acima de R$ 50 mil/mês). Botão **"Enviar esta simulação"** manda os
  números pelo WhatsApp. É uma estimativa e **não substitui a apuração oficial**.
- **`guia-cnpj.html`** — Guia do CNPJ: 7 temas educativos para quem abriu empresa.
- **`contabilidade-para-*.html`** — páginas por ramo: profissional PJ, saúde, engenharia e
  arquitetura, TI/marketing/consultoria. *(geradas)*
- **`blog/`** — blog com posts sobre contabilidade e impostos (no ar desde 23/10/2026). *(gerado)*

## Como funciona

- Hospedado no **GitHub Pages**: todo `git push` na `main` publica em ~1 minuto.
- As páginas da home, calculadora e guia são arquivos HTML únicos (logo em base64).
- As páginas **geradas** (ramos e blog) nascem de textos em Markdown na pasta `_conteudo/`:
  edite o `.md` e rode

  ```bash
  node _scripts/build.mjs
  ```

  O build grava as páginas, o `sitemap.xml` e partes marcadas da home, e avisa se algum
  texto tiver problema.
- **Blog:** toda segunda uma tarefa agendada escreve um post novo e abre um **Pull Request
  "Blog: …"**. Para publicar, leia o texto e clique em **Merge**. Regras de escrita em
  `_conteudo/GUIA-EDITORIAL-BLOG.md`.
- **Visitas e cliques:** GoatCounter (grátis, sem cookies), código `prosperacontabil`.

> ℹ️ Detalhes de identidade visual, regras fiscais da calculadora, estrutura e fluxo de
> trabalho estão no [`CLAUDE.md`](CLAUDE.md). Agentes: mantenham o CLAUDE.md e este README
> atualizados a cada mudança.

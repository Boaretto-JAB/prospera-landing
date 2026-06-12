# Prospera — Site institucional

Site da **Prospera Assessoria e Consultoria Contábil** (Capinzal/SC), contabilidade
para prestadores de serviço no Simples Nacional.

🔗 **No ar em:** https://prospera-contabil.com

## Páginas

- **`index.html`** — landing page (apresentação, serviços, dúvidas e contato).
- **`calculadora.html`** — calculadora do Simples Nacional (estima DAS, pró-labore
  e quanto sobra para o sócio nos Anexos III e V). É uma estimativa para
  planejamento e **não substitui a apuração oficial**.
- **`guia-cnpj.html`** — Guia do CNPJ: 7 temas educativos para quem abriu
  empresa (pró-labore × lucros, golpes, DAS, notas fiscais, e-CNPJ, guarda de
  documentos…). Está no menu, no rodapé e ao final da seção "Dúvidas".

## Como funciona

- Cada página é um **arquivo HTML único** (CSS e JavaScript embutidos; logo e
  favicon em base64). **Não há etapa de build.**
- Hospedado no **GitHub Pages**: todo `git push` na branch `main` publica
  automaticamente em ~1 minuto.
- O domínio é definido pelo arquivo `CNAME`.

## Editar

1. Abra o `.html` no navegador para visualizar (não precisa de servidor).
2. Edite o arquivo, faça commit e `git push` na `main`.

> ℹ️ Detalhes de identidade visual, regras fiscais da calculadora e fluxo de
> trabalho estão documentados em [`CLAUDE.md`](CLAUDE.md).

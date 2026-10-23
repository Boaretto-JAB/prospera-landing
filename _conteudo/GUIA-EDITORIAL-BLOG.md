# Guia editorial do Blog da Prospera

> Regras para quem escreve os posts — pessoas ou o agente da tarefa semanal.
> Arquivo interno: não é publicado no site.

## 1. Para quem escrevemos

Donos de pequenas empresas de **prestação de serviço no Simples Nacional**, sem formação
contábil: profissionais PJ, saúde, engenharia/arquitetura, TI/marketing/consultoria.
A pergunta que todo post responde logo no início: **"o que isso muda para mim e o que eu faço?"**

## 2. Tom

- Português do Brasil, simples e direto. Frases curtas. Explique toda sigla na primeira vez
  (ex.: "DAS, a guia única do Simples").
- Sem juridiquês, sem alarmismo, sem promessa ("garantimos", "zere seus impostos").
- A Prospera fala em primeira pessoa do plural ("nós", "a gente cuida") e convida para conversar
  no fim — sem empurrar venda no meio do texto.
- **Nunca** citar cliente, nome de empresa atendida, números internos ou dados do Cadastro.

## 3. Exatidão (a regra mais importante)

- Toda data, valor, alíquota, prazo ou número de lei precisa estar numa **fonte oficial**
  (gov.br, Receita Federal, Portal do Simples Nacional, Planalto/legislação, CGSN, CGIBS, CFC,
  prefeitura) ou, na falta dela, em **pelo menos duas fontes confiáveis** que concordem.
- Se as fontes divergem, **diga que divergem** e qual é a posição oficial — ou deixe o ponto de fora.
- Temas em discussão na Justiça são apresentados assim: posição da Receita + "tema em discussão".
- Lucros e dividendos: sempre com a regra atual — isentos até R$ 50 mil/mês por sócio; acima disso,
  retenção de 10% sobre o total segundo a Receita (Lei 15.270/2025), tema em discussão judicial.
- Exemplos com números: só **ilustrativos**, calculados com as mesmas regras da
  [Calculadora](../calculadora.html) e marcados como exemplo.
- Na dúvida, não publique o ponto: anote em "Pontos para conferir" na descrição do PR.

## 4. Formato do arquivo

Arquivo em `_conteudo/blog/AAAA-MM-DD-endereco-do-post.md` (minúsculas, sem acento, com hífens).
O endereço vira `prospera-contabil.com/blog/endereco-do-post.html`.

```
---
titulo: Título claro, com a palavra-chave no começo (até ~70 caracteres)
resumo: Uma ou duas frases que aparecem no Google e nos cartões (até 170 caracteres).
data: AAAA-MM-DD            (mesma data do nome do arquivo; não pode ser no futuro)
categoria: Simples Nacional (uma da lista abaixo)
autor: Equipe Prospera      (opcional)
atualizado: AAAA-MM-DD      (opcional — use quando corrigir um post antigo)
---
Texto em Markdown…

## Fontes
- [Nome da fonte oficial](https://...) — consultado em DD/MM/AAAA
```

**Categorias aceitas:** Simples Nacional · Reforma Tributária · Notas fiscais · Imposto de Renda ·
Lucros e pró-labore · Departamento pessoal · Abertura de empresa · Gestão

**Estrutura recomendada (600 a 1.100 palavras):**
1. Abertura de 2–3 frases: o que mudou/importa e para quem.
2. Seções com `##` (o que é, o que muda, exemplos, prazos).
3. `## O que fazer agora` — lista curta de ações práticas.
4. `## Fontes` — obrigatória (o build recusa post sem ela).

Use `> **Atenção:** …` para avisos (vira uma caixa dourada). Tabelas em Markdown funcionam.
Links internos úteis: `/calculadora.html`, `/guia-cnpj.html`, `/#proposta` e as páginas
`/contabilidade-para-….html`.

## 5. Pauta (prioridades)

1. **Novidades da semana** que afetam o Simples/prestadores (norma nova, prazo, mudança de sistema).
2. Calendário: prazos do mês que vem (DAS, DCTFWeb, IRPF, opções da Reforma Tributária).
3. Temas fixos (quando não houver novidade): Fator R; pró-labore × lucros; NFS-e Nacional;
   Reforma Tributária no Simples (IBS/CBS, opção pelo regime regular por semestre, campos na nota);
   MEI → ME; certificado digital e procuração; golpes e boletos falsos; trocar de contador;
   carnê-leão × PJ; exportação de serviços; IRPF dos sócios.
4. Não repetir assunto tratado nas últimas 8 semanas, a não ser que haja norma nova
   (nesse caso, prefira **atualizar** o post antigo e preencher `atualizado:`).

## 6. Como publicar

1. Escreva/edite o `.md` em `_conteudo/blog/`.
2. Rode `node _scripts/build.mjs` na raiz do repositório (gera o HTML, a lista do blog, o feed,
   o sitemap e a seção "Novidades" da home). Se aparecer ❌, corrija o que ele apontar.
3. Posts automáticos vão para um **Pull Request "Blog: …"** — as sócias leem e, se estiver tudo
   certo, clicam em **Merge**. O site atualiza sozinho em ~1 minuto.

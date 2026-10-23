#!/usr/bin/env node
// =============================================================================
// Gerador do site (sem dependências: só Node 18+ e o marked que está em vendor/).
//
//   node _scripts/build.mjs
//
// Lê _conteudo/ e grava (sobrescreve) os arquivos GERADOS:
//   - contabilidade-para-*.html  ← _conteudo/ramos/*.md
//   - blog/index.html, blog/<slug>.html, blog/feed.xml  ← _conteudo/blog/AAAA-MM-DD-slug.md
//   - sitemap.xml
//   - trechos marcados do index.html: <!-- BLOG:NAV -->, <!-- BLOG:NOVIDADES -->,
//     <!-- RAMOS:SERVICOS --> e <!-- RAMOS:RODAPE --> (o resto do index é manual)
// Páginas geradas que perderam o .md de origem são apagadas.
// Se algum .md tiver problema (campo faltando, data inválida…), nada é gravado.
// =============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from './vendor/marked.esm.js';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://prospera-contabil.com';
const WA_NUMERO = '5549998400684';
const CATEGORIAS = ['Simples Nacional', 'Reforma Tributária', 'Notas fiscais', 'Imposto de Renda', 'Lucros e pró-labore', 'Departamento pessoal', 'Abertura de empresa', 'Gestão'];
const PAGINAS_FIXAS = ['/', '/calculadora.html', '/guia-cnpj.html'];
const ICONE_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>';

const erros = [];
const gravacoes = new Map(); // caminho relativo -> conteúdo

// ---------- utilidades ----------
const ler = (rel) => fs.readFileSync(path.join(RAIZ, rel), 'utf8');
const existe = (rel) => fs.existsSync(path.join(RAIZ, rel));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escXml = esc;
const waLink = (txt) => `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(txt)}`;
const dataBR = (iso) => new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T12:00:00Z'));
const hojeISO = () => new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10); // horário de Brasília

function frontMatter(texto, arquivo) {
  const m = texto.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) { erros.push(`${arquivo}: falta o cabeçalho entre as linhas --- e ---`); return { dados: {}, corpo: texto }; }
  const dados = {};
  for (const linha of m[1].split('\n')) {
    if (!linha.trim() || linha.trim().startsWith('#')) continue;
    const i = linha.indexOf(':');
    if (i < 0) { erros.push(`${arquivo}: linha do cabeçalho sem ":" → ${linha}`); continue; }
    let v = linha.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    dados[linha.slice(0, i).trim()] = v;
  }
  return { dados, corpo: m[2] };
}

function exigir(dados, campos, arquivo) {
  for (const c of campos) if (!dados[c]) erros.push(`${arquivo}: campo "${c}" vazio ou ausente no cabeçalho`);
}

// Markdown → HTML. Links externos abrem em nova aba; tabelas ganham rolagem no celular.
marked.use({
  gfm: true,
  renderer: {
    link({ href, title, tokens }) {
      const texto = this.parser.parseInline(tokens);
      const externo = /^https?:\/\//.test(href) && !href.startsWith(SITE);
      return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${externo ? ' target="_blank" rel="noopener"' : ''}>${texto}</a>`;
    },
    heading({ tokens, depth }) {
      const texto = this.parser.parseInline(tokens);
      const id = texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h${depth} id="${id}">${texto}</h${depth}>\n`;
    },
  },
});
const md = (texto) => marked.parse(texto).replace(/<table>/g, '<div class="tabela"><table>').replace(/<\/table>/g, '</table></div>');

const MODELO = ler('_modelos/pagina.html');
function pagina(vars) {
  const html = MODELO.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in vars)) { erros.push(`modelo: variável {{${k}}} sem valor`); return ''; }
    return vars[k];
  });
  return html;
}

// ---------- ramos ("Contabilidade para…") ----------
const DIR_RAMOS = '_conteudo/ramos';
const ramos = fs.readdirSync(path.join(RAIZ, DIR_RAMOS)).filter((f) => f.endsWith('.md')).map((f) => {
  const arq = `${DIR_RAMOS}/${f}`;
  const { dados, corpo } = frontMatter(ler(arq), arq);
  exigir(dados, ['titulo', 'titulo_seo', 'resumo', 'menu', 'ordem', 'eyebrow', 'mensagem_whatsapp', 'ramo_formulario'], arq);
  const slug = f.replace(/\.md$/, '');
  if (!/^contabilidade-para-[a-z0-9-]+$/.test(slug)) erros.push(`${arq}: o nome do arquivo deve ser contabilidade-para-<algo>.md (minúsculas, sem acento)`);
  return { ...dados, slug, arquivo: arq, corpo, url: `/${slug}.html`, ordem: Number(dados.ordem) || 99 };
}).sort((a, b) => a.ordem - b.ordem);

// ---------- posts do blog ----------
const DIR_BLOG = '_conteudo/blog';
const hoje = hojeISO();
const posts = fs.readdirSync(path.join(RAIZ, DIR_BLOG)).filter((f) => /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/.test(f)).map((f) => {
  const arq = `${DIR_BLOG}/${f}`;
  const { dados, corpo } = frontMatter(ler(arq), arq);
  exigir(dados, ['titulo', 'resumo', 'data', 'categoria'], arq);
  const slug = f.slice(11, -3);
  if (dados.data && f.slice(0, 10) !== dados.data) erros.push(`${arq}: a data do cabeçalho (${dados.data}) não bate com a do nome do arquivo`);
  if (dados.data && Number.isNaN(Date.parse(dados.data))) erros.push(`${arq}: data inválida (use AAAA-MM-DD)`);
  if (dados.data > hoje) erros.push(`${arq}: data no futuro (${dados.data}) — o post só pode ser gerado a partir desse dia`);
  if (dados.atualizado && Number.isNaN(Date.parse(dados.atualizado))) erros.push(`${arq}: "atualizado" inválido (use AAAA-MM-DD)`);
  if (dados.categoria && !CATEGORIAS.includes(dados.categoria)) erros.push(`${arq}: categoria "${dados.categoria}" fora da lista: ${CATEGORIAS.join(', ')}`);
  if (dados.resumo && dados.resumo.length > 170) erros.push(`${arq}: resumo com ${dados.resumo.length} caracteres (máximo 170 — é o texto que aparece no Google)`);
  if (!/^## Fontes\s*$/m.test(corpo)) erros.push(`${arq}: falta a seção "## Fontes" no fim do texto (regra do guia editorial)`);
  const palavras = corpo.split(/\s+/).filter(Boolean).length;
  return { ...dados, slug, arquivo: arq, corpo, url: `/blog/${slug}.html`, minutos: Math.max(1, Math.round(palavras / 200)) };
}).sort((a, b) => (b.data + b.slug).localeCompare(a.data + a.slug));
const temBlog = posts.length > 0;
{
  const vistos = new Set();
  for (const p of posts) { if (vistos.has(p.slug)) erros.push(`${p.arquivo}: já existe outro post com o endereço "${p.slug}"`); vistos.add(p.slug); }
}

// ---------- trechos compartilhados ----------
const navBlog = (atual) => (temBlog ? `<a href="/blog/"${atual ? ' aria-current="page"' : ''}>Blog</a>` : '');
const rodapeRamos = ramos.map((r) => `<a href="${r.url}">${esc(r.menu)}</a>`).join('\n          ');
const ORG = { '@type': 'Organization', name: 'Prospera Consultoria Contábil', url: SITE + '/', logo: SITE + '/assets/logo.png' };
const cartao = (p) => `<a class="card" href="${p.url}">
          <span class="cat">${esc(p.categoria)}</span>
          <h3>${esc(p.titulo)}</h3>
          <p>${esc(p.resumo)}</p>
          <span class="data">${dataBR(p.data)} · ${p.minutos} min de leitura</span>
        </a>`;
const base = (atualBlog) => ({ nav_blog: navBlog(atualBlog), rodape_ramos: rodapeRamos, icone_wa: ICONE_WA, extra_head: temBlog ? `<link rel="alternate" type="application/rss+xml" title="Blog da Prospera" href="${SITE}/blog/feed.xml" />` : '' });

// ---------- gerar páginas de ramo ----------
for (const r of ramos) {
  const outros = ramos.filter((o) => o !== r).map((o) => `<a href="${o.url}">${esc(o.menu)}</a>`).join(' · ');
  const conteudo = `
    <section class="page-hero">
      <div class="wrap narrow">
        <span class="eyebrow">${esc(r.eyebrow)}</span>
        <h1>${esc(r.titulo)}</h1>
        <p class="lead">${esc(r.resumo)}</p>
        <div class="hero-actions">
          <a class="btn btn-wa" href="${waLink(r.mensagem_whatsapp)}" target="_blank" rel="noopener">${ICONE_WA} Falar no WhatsApp</a>
          <a class="btn btn-outline" href="/?ramo=${encodeURIComponent(r.ramo_formulario)}#proposta">Peça uma proposta</a>
        </div>
      </div>
    </section>
    <div class="wrap narrow">
      <article class="artigo">
${md(r.corpo)}
      </article>
      <div class="cta">
        <h2>Vamos cuidar da sua empresa?</h2>
        <p>Conte como é o seu negócio e receba uma orientação inicial sem compromisso — em linguagem simples.</p>
        <div class="btns">
          <a class="btn btn-wa" href="${waLink(r.mensagem_whatsapp)}" target="_blank" rel="noopener">${ICONE_WA} Falar no WhatsApp</a>
          <a class="btn btn-ghost-light" href="/calculadora.html">Simular meus impostos</a>
        </div>
      </div>
      <p class="disc">Também atendemos: ${outros}. Conteúdo informativo, que não substitui a análise do seu caso — o enquadramento correto depende da atividade (CNAE), do faturamento e da folha de cada empresa.</p>
    </div>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'WebPage', name: r.titulo_seo, description: r.resumo, url: SITE + r.url, publisher: ORG };
  gravacoes.set(r.url.slice(1), pagina({ ...base(false), titulo_seo: esc(r.titulo_seo), descricao: esc(r.resumo), url: SITE + r.url, og_tipo: 'website', og_titulo: esc(r.titulo_seo), jsonld: JSON.stringify(jsonld), conteudo, wa_link: waLink(r.mensagem_whatsapp) }));
}

// ---------- gerar blog ----------
if (temBlog) {
  for (const p of posts) {
    const relacionados = posts.filter((o) => o !== p).sort((a, b) => (b.categoria === p.categoria) - (a.categoria === p.categoria)).slice(0, 3);
    const msg = `Olá! Li o artigo "${p.titulo}" no blog da Prospera e gostaria de conversar sobre o meu caso.`;
    const atualizado = p.atualizado && p.atualizado !== p.data ? ` · atualizado em ${dataBR(p.atualizado)}` : '';
    const conteudo = `
    <section class="page-hero">
      <div class="wrap narrow">
        <nav class="trilha" aria-label="Você está em"><a href="/blog/">Blog</a> › ${esc(p.categoria)}</nav>
        <span class="eyebrow">${esc(p.categoria)}</span>
        <h1>${esc(p.titulo)}</h1>
        <p class="lead">${esc(p.resumo)}</p>
        <p class="meta"><span>${dataBR(p.data)}${atualizado}</span><span>${p.minutos} min de leitura</span><span>Por ${esc(p.autor || 'Equipe Prospera')}</span></p>
      </div>
    </section>
    <div class="wrap narrow">
      <article class="artigo">
${md(p.corpo)}
      </article>
      <div class="cta">
        <h2>Ficou com dúvida sobre o seu caso?</h2>
        <p>Cada empresa tem a sua realidade. Fale com a Prospera e receba uma orientação inicial sem compromisso.</p>
        <div class="btns">
          <a class="btn btn-wa" href="${waLink(msg)}" target="_blank" rel="noopener">${ICONE_WA} Falar no WhatsApp</a>
          <a class="btn btn-ghost-light" href="/#proposta">Peça uma proposta</a>
        </div>
      </div>
      <p class="disc">Conteúdo informativo, escrito com base nas normas e fontes oficiais disponíveis em ${dataBR(p.atualizado || p.data)}. Regras tributárias mudam com frequência e não substituem a análise do seu caso pela sua contabilidade.</p>
      ${relacionados.length ? `<section class="relacionados"><h2>Leia também</h2><div class="cards">${relacionados.map(cartao).join('\n        ')}</div></section>` : ''}
    </div>`;
    const jsonld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.titulo, description: p.resumo, datePublished: p.data, dateModified: p.atualizado || p.data, url: SITE + p.url, mainEntityOfPage: SITE + p.url, image: SITE + '/assets/og-image.jpg', inLanguage: 'pt-BR', author: { '@type': 'Organization', name: p.autor || 'Equipe Prospera' }, publisher: ORG };
    gravacoes.set(p.url.slice(1), pagina({ ...base(true), titulo_seo: esc(`${p.titulo} · Blog da Prospera`), descricao: esc(p.resumo), url: SITE + p.url, og_tipo: 'article', og_titulo: esc(p.titulo), jsonld: JSON.stringify(jsonld), conteudo, wa_link: waLink(msg) }));
  }
  const indice = `
    <section class="page-hero">
      <div class="wrap">
        <span class="eyebrow">Blog</span>
        <h1>Contabilidade sem complicação</h1>
        <p class="lead">Novidades e orientações sobre Simples Nacional, impostos, notas fiscais e a Reforma Tributária — em linguagem simples, para quem presta serviço.</p>
      </div>
    </section>
    <div class="wrap">
      <div class="cards">
        ${posts.map(cartao).join('\n        ')}
      </div>
    </div>`;
  const msgBlog = 'Olá! Vim pelo blog da Prospera e gostaria de mais informações.';
  gravacoes.set('blog/index.html', pagina({ ...base(true), titulo_seo: 'Blog da Prospera · contabilidade para prestadores de serviço', descricao: 'Novidades e orientações sobre Simples Nacional, impostos, notas fiscais e Reforma Tributária, em linguagem simples.', url: SITE + '/blog/', og_tipo: 'website', og_titulo: 'Blog da Prospera', jsonld: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog da Prospera', url: SITE + '/blog/', publisher: ORG }), conteudo: indice, wa_link: waLink(msgBlog) }));
  const itens = posts.slice(0, 20).map((p) => `    <item>
      <title>${escXml(p.titulo)}</title>
      <link>${SITE}${p.url}</link>
      <guid>${SITE}${p.url}</guid>
      <pubDate>${new Date(p.data + 'T12:00:00Z').toUTCString()}</pubDate>
      <category>${escXml(p.categoria)}</category>
      <description>${escXml(p.resumo)}</description>
    </item>`).join('\n');
  gravacoes.set('blog/feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog da Prospera</title>
    <link>${SITE}/blog/</link>
    <description>Contabilidade para prestadores de serviço no Simples Nacional, em linguagem simples.</description>
    <language>pt-BR</language>
${itens}
  </channel>
</rss>
`);
}

// ---------- sitemap ----------
const urlsSitemap = [
  ...PAGINAS_FIXAS.map((u) => ({ loc: SITE + u })),
  ...ramos.map((r) => ({ loc: SITE + r.url })),
  ...(temBlog ? [{ loc: SITE + '/blog/', lastmod: posts[0].atualizado || posts[0].data }] : []),
  ...posts.map((p) => ({ loc: SITE + p.url, lastmod: p.atualizado || p.data })),
];
gravacoes.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsSitemap.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`);

// ---------- trechos do index.html ----------
function trocarTrecho(html, nome, novo) {
  const re = new RegExp(`(<!-- ${nome} -->)[\\s\\S]*?(<!-- /${nome} -->)`, 'g');
  if (!re.test(html)) { erros.push(`index.html: marcador <!-- ${nome} --> … <!-- /${nome} --> não encontrado`); return html; }
  return html.replace(re, (_, a, b) => `${a}${novo}${b}`);
}
{
  let index = ler('index.html');
  index = trocarTrecho(index, 'BLOG:NAV', temBlog ? '<a href="/blog/">Blog</a>' : '');
  index = trocarTrecho(index, 'RAMOS:SERVICOS', ramos.length ? `
        <p class="services-note reveal">Atendimento especializado para: ${ramos.map((r) => `<a href="${r.url}">${esc(r.menu)}</a>`).join(' · ')}.</p>
        ` : '');
  index = trocarTrecho(index, 'RAMOS:RODAPE', ramos.length ? `
        <div class="foot-col">
          <h4>Para quem atendemos</h4>
          ${rodapeRamos}
        </div>
        ` : '');
  index = trocarTrecho(index, 'BLOG:NOVIDADES', temBlog ? `
    <section class="section" id="novidades">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">Novidades</span>
          <h2>Do blog da Prospera</h2>
        </div>
        <div class="cards reveal">
        ${posts.slice(0, 3).map(cartao).join('\n        ')}
        </div>
        <p class="services-note reveal"><a href="/blog/">Ver todos os artigos</a></p>
      </div>
    </section>
    ` : '');
  gravacoes.set('index.html', index);
}

// ---------- gravar (só se não houve erro) ----------
if (erros.length) {
  console.error('\n❌ O build encontrou problemas — nada foi gravado:\n');
  for (const e of erros) console.error('  • ' + e);
  process.exit(1);
}
const alterados = [];
for (const [rel, conteudo] of gravacoes) {
  const f = path.join(RAIZ, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  if (!existe(rel) || fs.readFileSync(f, 'utf8') !== conteudo) { fs.writeFileSync(f, conteudo); alterados.push(rel); }
}
// apaga páginas geradas cujo .md sumiu
const apagados = [];
for (const f of fs.readdirSync(RAIZ)) {
  if (/^contabilidade-para-[a-z0-9-]+\.html$/.test(f) && !gravacoes.has(f)) { fs.unlinkSync(path.join(RAIZ, f)); apagados.push(f); }
}
if (existe('blog')) {
  for (const f of fs.readdirSync(path.join(RAIZ, 'blog'))) {
    const rel = `blog/${f}`;
    if (!gravacoes.has(rel)) { fs.unlinkSync(path.join(RAIZ, rel)); apagados.push(rel); }
  }
  if (!fs.readdirSync(path.join(RAIZ, 'blog')).length) fs.rmdirSync(path.join(RAIZ, 'blog'));
}
console.log(`✅ Build ok — ${ramos.length} página(s) de ramo, ${posts.length} post(s).`);
console.log(alterados.length ? `   Alterados: ${alterados.join(', ')}` : '   Nenhum arquivo mudou.');
if (apagados.length) console.log(`   Apagados (sem .md de origem): ${apagados.join(', ')}`);

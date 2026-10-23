// Contador de cliques do site (GoatCounter — grátis e sem cookies).
// Conta cliques no WhatsApp e na Área do cliente; o painel fica em
// https://prosperacontabil.goatcounter.com (aba "Events"/eventos).
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href]');
  if (!a || !window.goatcounter || !window.goatcounter.count) return;
  var href = a.getAttribute('href') || '';
  var evento = href.indexOf('wa.me') !== -1 ? 'whatsapp'
             : href.indexOf('onvio.com.br') !== -1 ? 'area-do-cliente'
             : null;
  if (!evento) return;
  var pagina = location.pathname === '/' ? 'home' : location.pathname.replace(/^\/|\.html$/g, '');
  window.goatcounter.count({ path: evento, title: pagina + ': ' + a.textContent.replace(/\s+/g, ' ').trim().slice(0, 60), event: true });
});

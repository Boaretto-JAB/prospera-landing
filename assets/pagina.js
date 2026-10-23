// Páginas geradas: menu do celular e ano no rodapé.
(function () {
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  function alternar(abrir) {
    menu.classList.toggle('open', abrir);
    btn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { alternar(!menu.classList.contains('open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { alternar(false); }); });
})();

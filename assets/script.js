'use strict';
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
if (menu && nav) {
  const closeMenu = (restoreFocus = false) => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('open');
    if (restoreFocus) menu.focus();
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu(nav.contains(document.activeElement));
    }
  });
  const mobile = matchMedia('(max-width: 820px)');
  let navHadFocus = false;
  document.addEventListener('focusin', event => {
    navHadFocus = nav.contains(event.target);
  });
  mobile.addEventListener('change', () => {
    const focusedInNav = navHadFocus || nav.contains(document.activeElement);
    closeMenu(mobile.matches && focusedInNav);
  });
  nav.addEventListener('click', event => {
    if (mobile.matches && event.target.closest('a')) closeMenu(true);
  });
  document.documentElement.classList.add('nav-ready');
}
const service = document.querySelector('#service');
if (service) {
  const value = new URLSearchParams(location.search).get('service');
  if ([...service.options].some(option => option.value === value)) service.value = value;
}
if (location.protocol === 'https:' || location.protocol === 'http:') {
  document.querySelectorAll('input[name="_next"]').forEach(input => {
    input.value = new URL('thank-you.html', location.href).href;
  });
}

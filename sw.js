const CACHE_NAME = 'hagios-v1-cache';
const ASSETS = [
  './',
  './index.html',
  './home.html',
  './login.html',
  './modulo.html',
  './css/styles.css',
  './css/01-variables.css',
  './css/02-reset.css',
  './css/03-base.css',
  './css/04-components.css',
  './css/05-modules.css',
  './css/06-utilities.css',
  './css/07-enhancements.css',
  './script.js',
  './js/firebase-init.js',
  './assets/images/hagios-logo.png',
  './assets/images/fav.png',
  './dados/modulos.json'
];

// Instalação e Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação e Limpeza de Cache antigo
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia: Cache First, then Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

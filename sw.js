const CACHE_NAME = 'cpeo-v1';
const ASSETS = [
  '/cpeo-mobile-modern/',
  '/cpeo-mobile-modern/index.html',
  '/cpeo-mobile-modern/styles.css',
  '/cpeo-mobile-modern/script.js',
  '/cpeo-mobile-modern/manifest.json',
  '/cpeo-mobile-modern/images/hero-bg.svg',
  '/cpeo-mobile-modern/images/office-1.svg',
  '/cpeo-mobile-modern/images/conference-room.svg',
  '/cpeo-mobile-modern/images/reception.svg',
  '/cpeo-mobile-modern/images/building.svg',
  '/cpeo-mobile-modern/images/virtual-office.svg',
  '/cpeo-mobile-modern/images/kitchen.svg'
];

// Install - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

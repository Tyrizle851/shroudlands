// Simple offline cache for Shroudlands Starter
const CACHE = 'shroudlands-v1.0.0';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE && caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Only handle GET
  if (e.request.method !== 'GET') return;
  // Try cache-first, then network
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(e.request);
    if (cached) return cached;
    try {
      const res = await fetch(e.request);
      // Cache same-origin GETs
      if (url.origin === location.origin && res.ok && res.type === 'basic') {
        cache.put(e.request, res.clone());
      }
      return res;
    } catch (err) {
      // Fallback to index for navigations
      if (e.request.mode === 'navigate') {
        return await cache.match('./index.html');
      }
      throw err;
    }
  })());
});
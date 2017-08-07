'use strict';

const cacheVersion = 1;
const currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'index.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(cache => {
      return cache.addAll([
          'manifest.json',
          'offline.html',
          'app.main.js',
          'main.css',
          'images/favicon.ico',
          'images/icon-128.png',
          'images/icon-152.png',
          'images/icon-144.png',
          'images/icon-192.png',
          'images/icon-256.png',
          'images/icon-512.png',
          offlineUrl
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) || (event.request.url.match('/wp-admin/') || event.request.url.match('/preview=true/'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        return caches.match(offlineUrl);
      })
    );
  }
  else {
      event.respondWith(caches.match(event.request)
          .then(response => {
            return response || fetch(event.request);
        })
      );
    }
});

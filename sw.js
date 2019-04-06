self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('passageClock').then(function(cache) {
      return cache.addAll([
        '/',
        '/styles.css',
        '/themes.css',
        '/index.js',
        '/index.bundle.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

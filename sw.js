self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('passageClock').then(function(cache) {
      return cache.addAll([
        '/',
        '/style.css',
        '/schemes.css',
        '/passageClock.js',
        '/bronto.jpg',
        '/yosemite-bkgd.mp4',
        '/yosemite-bkgd.webm',
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

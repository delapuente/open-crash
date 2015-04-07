
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open('test-cache').then(function (cache) {
    return fetch('./a.html').then(function (response) {
      return cache.put('./a.html', response).then(function () {
        console.log('Installed and cached a.html');
      });
    });
  }));
});

self.addEventListener('fetch', function (e) {
  console.log(e.request.method, e.request.url);
  e.respondWith(open());

  function open() {
    console.log('Before open...');
    var r = caches.open('test-cache').then(function (cache) {
      return cache.match(e.request).then(function (response) {
        if (response) { return Promise.resolve(response); }
        return fetch(e.request);
      });
    });
    console.log('After open...');
    return r;
  }
});

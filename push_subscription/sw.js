self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push event');
  const payload = event.data ? event.data.text() : 'empty push';
  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: payload,
    })
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker] Pushsubscriptionchange event');
});

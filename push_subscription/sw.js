self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push event');
  const payload = event.data ? event.data.text() : 'empty push';
  event.waitUntil(
    self.registration.showNotification('Push Message', {
      body: payload,
    })
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker] Pushsubscriptionchange event');
  console.log(JSON.stringify(event.oldSubscription));
  console.log(JSON.stringify(event.newSubscription));
});
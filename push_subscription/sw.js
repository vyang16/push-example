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
  function logChange(event) {
    console.log('[Service Worker] pushsubscription change event received!');
    console.log(JSON.stringify(event.oldSubscription));
    console.log(JSON.stringify(event.newSubscription));
  }
  event.waitUntil(logChange(event));
});
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
  console.log('[Service Worker] pushsubscription change event registered'
              + JSON.stringify(event.oldSubscription)
              + JSON.stringify(event.newSubsciption));
});

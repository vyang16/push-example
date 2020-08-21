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
  console.log('[Service Worker] `pushsubscriptionchange` event!');
  if(event.oldSubscription) {
    console.log('has oldSubscription');
    console.log(JSON.stringify(event.oldSubscription));
  }else{
    console.log('no oldSubscription');
  }

  if(event.newSubscription) {
    console.log('has newSubscription');
    console.log(JSON.stringify(event.newSubscription));
  }else{
    console.log("no newSubscription");
  }

});



self.addEventListener('pushsubscriptionchange', function(event) {
    console.log('[Service Worker] Pushsubscriptionchange event');
    console.log(JSON.stringify(event.oldSubscription));
    console.log(JSON.stringify(event.newSubscription));
});
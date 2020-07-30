function urlBase64ToUint8Array(base64String) {
const padding = '='.repeat((4 - base64String.length % 4) % 4);
const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

const rawData = window.atob(base64);
const outputArray = new Uint8Array(rawData.length);

for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
}
return outputArray;
}

var subscriptionButton = document.getElementById("subscriptionButton");
var getSubscriptionButton = document.getElementById("getSubscriptionButton");
var subscriptionBody = document.getElementById("subscriptionBody");
var getSubscriptionBody = document.getElementById("getSubscriptionBody");
var expirationTimeBody = document.getElementById("expirationTimeBody");


const publicVapidKey = 'BCzPIAvVbS3rrFvegnOxEAYhvHnNndFaWfipnpByNVyFikztMwsL7SNcJ_mlWPSd3tLEABHi3vU7tzBVn5Cmujc';
// AsEd1NOovrY5ZPkirzkCFcY9SHJID9I3U9V3qeMb16o
getSubscriptionButton.onclick = getSubscription;


navigator.serviceWorker.register('sw.js');

navigator.serviceWorker.ready
.then(function(registration) {
  console.log('service worker registered');
  subscriptionButton.disabled = false;
  return registration.pushManager.getSubscription();
}).then(function(subscription) {
  if (subscription) {
    console.log('Already subscribed', subscription.endpoint);
    setUnsubscribeButton();
    getSubscriptionButton.disabled = false;
  } else {
    setSubscribeButton();
    getSubscriptionButton.disabled = true;
  }
});

function subscribe() {
    navigator.serviceWorker.ready
    .then(async function(registration) {
      const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
    }).then(function(subscription) {
      console.log('Subscribed', subscription.endpoint);
      subscriptionBody.textContent = JSON.stringify(subscription, undefined, 4);
      expirationTimeBody.textContent = convertMillisecondsToString(subscription.expirationTime);
    }).then(setUnsubscribeButton).then(toggleGetSubscription);
}

function convertMillisecondsToString(time) {
  if(!time){
    return "null";
  }
  var date = new Date(time);
  return date.toString();
}

function toggleGetSubscription() {
    getSubscriptionButton.disabled = !getSubscriptionButton.disabled;
}

function unsubscribe() {
    navigator.serviceWorker.ready
    .then(function(registration) {
        return registration.pushManager.getSubscription();
    }).then(function(subscription) {
        return subscription.unsubscribe()
    }).then(setSubscribeButton).then(toggleGetSubscription);
    subscriptionBody.textContent = null;
    getSubscriptionBody.textContent = null;
    expirationTimeBody.textContent = null;
}

function getSubscription() {
    navigator.serviceWorker.ready
    .then(function(registration) {
        return registration.pushManager.getSubscription();
    }).then(function(subscription) {
        getSubscriptionBody.textContent = JSON.stringify(subscription, undefined, 4);
    });
}

  function setSubscribeButton() {
    subscriptionButton.onclick = subscribe;
    subscriptionButton.textContent = 'Subscribe';
  }

  function setUnsubscribeButton() {
    subscriptionButton.onclick = unsubscribe;
    subscriptionButton.textContent = 'Unsubscribe';
  }
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDHK7PWU5nx55jaUpwzcT92RD8y6IsfEMM",
  authDomain: "push-notification-cbc84.firebaseapp.com",
  projectId: "push-notification-cbc84",
  storageBucket: "push-notification-cbc84.appspot.com",
  messagingSenderId: "144320057473",
  appId: "1:144320057473:web:9c06264e2aeb140172fd80",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = "https://fcm-push-notifications.vercel.app/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if the dedicated page is already open, focus on it; otherwise, open a new window/tab
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if ("focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(urlToOpen);
    })
  );
});

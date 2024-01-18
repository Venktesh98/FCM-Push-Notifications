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

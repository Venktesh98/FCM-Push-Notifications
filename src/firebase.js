import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDHK7PWU5nx55jaUpwzcT92RD8y6IsfEMM",
  authDomain: "push-notification-cbc84.firebaseapp.com",
  projectId: "push-notification-cbc84",
  storageBucket: "push-notification-cbc84.appspot.com",
  messagingSenderId: "144320057473",
  appId: "1:144320057473:web:9c06264e2aeb140172fd80"
};

const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  let messaging = null;

  if (process.browser) {
    messaging = getMessaging(app);
  }

  return messaging;
};

export const messaging = initializeFirebase();

export const requestPermission = async () => {
  if (!messaging) return;

  console.log("Requesting User Permission...");
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");
      return handleTokenRetrieval();
    } else {
      console.log("User Permission Denied.");
    }
  } catch (error) {
    console.error("An error occurred when requesting permission:", error);
  }
};

const handleTokenRetrieval = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        // "BI-h8f1QnjwoLCbBu2Dxksgjo1-69WJ5QlOo3SAbLeefNC6BQ1z6DTPEkJoMs785BWPNS1tD9DzfB91co-R6MzQ",
        "BMsKaamwRdDf6gtAnK3wE7S0jv-VAhOozf0RNo7WNVsCWK5aMQBnGjrhPXqIioiH5jEG8XNR76rh15PRmSqkdAE",
    });
    if (currentToken) {
      console.log("Client Token:", currentToken);
      localStorage.setItem("fcm-token", currentToken);
      return currentToken;
    } else {
      console.log("Failed to generate the app registration token.");
    }
  } catch (error) {
    console.error("An error occurred when retrieving token:", error);
    handleTokenRetrieval();
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });

import { requestPermission, onMessageListener } from "../firebase";
import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";

const sendPushRequest = (payload) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "key=AAAAIZolUIE:APA91bE35sPRExQJ9nT9WzK4XPESnxsWGr-t1gBNvdH-tL3IxxUGko3aT8j793mlDBlsd52nZxC-v_tUpjbyAQ-ItZfdKn3Fm3P7j_RuVjG402-aowXFy4n_oUHpGpvntcoczsvLJU3L",
    // Authorization: process.env.NEXT_PUBLIC_SERVER_KEY,
  };

  axios
    .post("https://fcm.googleapis.com/fcm/send", payload, {
      headers: headers,
    })
    .then(() => {
      console.log("vissibilty:", document.visibilityState);
      if (document.visibilityState === "visible") {
        // show foreground notification
        showNotification(payload?.notification?.title, {
          body: payload?.notification?.body,
        });
      }
    });
};

const showNotification = (title, options) => {
  if (!("Notification" in window)) {
    console.error("This browser does not support system notifications");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, options);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, options);
      }
    });
  }
};

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        {
          scope: "/",
        }
      );
      console.log("Service Worker registered: ", registration);
    } catch (error) {
      console.error("Service Worker registration failed: ", error);
    }
  }
};

function PushNotification() {
  useEffect(() => {
    registerServiceWorker();

    // Request notification permission
    const handlePermission = async () => {
      const permission = await requestPermission();
      if (permission !== "granted") {
        console.log("Permission not granted for notifications");
      }
    };
    handlePermission();

    // Listen for incoming messages
    const unsubscribe = onMessageListener().then((payload) => {
      console.log("In Foreground");
      showNotification(payload?.notification?.title, {
        body: payload?.notification?.body,
      });
    });

    return () => {
      unsubscribe.catch((err) => console.log("Failed: ", err));
    };
  }, []);

  const handlePushNotification = () => {
    const payload = {
      to: localStorage.getItem("fcm-token"),
      notification: {
        body: "Thanks for subscribing",
        title: "PWA 2.0",
      },
    };
    console.log("paylaod:", payload);
    sendPushRequest(payload);
  };

  return (
    <div>
      <h1>Notification Panel</h1>
      <button className={styles.button} onClick={handlePushNotification}>
        click here to receive notification
      </button>
    </div>
  );
}
export default PushNotification;

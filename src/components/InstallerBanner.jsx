// components/InstallBanner.js

import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    function isMobileDevice() {
      return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
      );
    }

    const handleInstallPrompt = (event) => {
      console.log("In install prompt", event);
      event.preventDefault();

      if (isMobileDevice()) {
        setShowBanner(true);
        // Store the event for later prompt
        setDeferredPrompt(event);
      }
      //   window.deferredPrompt = event;
    };

    const hidePrompt = () => {
      setShowBanner(false);
    };

    console.log("In checking eligibility prompt");

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        hidePrompt();
      }
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("visibilitychange", () => {});
    };
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
  };

  const handleInstall = () => {
    console.log("In install function:", deferredPrompt);
    if (deferredPrompt) {
      console.log("In install function if...");

      deferredPrompt.prompt();
      // Optional: Track installation success/failure
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("PWA installed!");
        } else {
          console.log("PWA installation declined.");
        }
      });
    }
  };

  setTimeout(() => {
    setShowBanner(false);
  }, 4000);

  console.log("Banner value:", showBanner);

  return showBanner ? (
    <div className={styles.installBannerContainer}>
      <div className={styles.installBanner}>
        <div>
          <img src="/favicon.ico" alt="No Image" width={40} height={40} />
        </div>

        <div className={styles.subBody}>
          <div>Install FCM</div>
          <div className={styles.link}>www.google.com</div>
        </div>
      </div>
      <div onClick={handleInstall} className={styles.installBtn}>
        Install
      </div>
    </div>
  ) : null;
}

export default InstallBanner;

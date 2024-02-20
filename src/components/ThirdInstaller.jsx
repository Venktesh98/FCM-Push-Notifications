// components/InstallBanner.js

import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  let timeoutId;

  useEffect(() => {
    const isMobileBrowser =
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      ) && navigator.userAgent.match(/Chrome|Firefox|Safari/i);

    const isInstalledPWA = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    timeoutId = setTimeout(() => {
      setShowBanner(false);
    }, 4000);

    if (isMobileBrowser && !isInstalledPWA) {
      const bannerShownBefore = localStorage.getItem("installBannerShown");
      if (!bannerShownBefore) {
        setShowBanner(true);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      console.log("In install prompt");
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const hidePrompt = () => {
      setShowBanner(false);
      localStorage.setItem("installBannerShown", "true");
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        hidePrompt();
      }
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("visibilitychange", () => {});
      clearTimeout(timeoutId);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setShowBanner(false);
      localStorage.setItem("installBannerShown", "true");
    }
  };

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

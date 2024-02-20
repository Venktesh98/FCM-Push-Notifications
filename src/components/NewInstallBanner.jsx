import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css"

function NewInstallBanner() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // Detect mobile browser
    const isMobileBrowser =
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      ) && navigator.userAgent.match(/Chrome|Firefox|Safari/i);

    // Handle beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("ever:", e);
      e.preventDefault(); // Prevent native banner
    //   if (isMobileBrowser) {
        setShowInstallButton(true);
        setInstallPrompt(e);
        // deferredPrompt = e;
    //   }
    });

    // Check if app is already installed
    if (localStorage.getItem("appInstalled")) {
      setIsAppInstalled(true);
    }
  }, []);

  // Handle install button click
  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setIsAppInstalled(true);
          localStorage.setItem("appInstalled", true);
          setInstallPrompt(null);
        }
      });
    }
  };

  return (
    <div>
      {/* Your app content here */}
      {showInstallButton && !isAppInstalled && (
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
          <div onClick={handleInstallClick} className={styles.installBtn}>
            Install
          </div>
        </div>
      )}
      <h1>Install above</h1>
    </div>
  );
}

export default NewInstallBanner;

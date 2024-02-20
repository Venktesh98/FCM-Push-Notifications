import React, { useState, useEffect } from "react";

function NewInstallBanner() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  let deferredPrompt;

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
      if (isMobileBrowser) {
        setShowInstallButton(true);
        setInstallPrompt(e);
        // deferredPrompt = e;
      }
    });

    // Check if app is already installed
    if (localStorage.getItem("appInstalled")) {
      setIsAppInstalled(true);
    }
  }, []);

  // Handle install button click
  const handleInstallClick = () => {
    console.log("promt:", installPrompt);
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
        <button onClick={handleInstallClick}>Install PWA</button>
      )}
    </div>
  );
}

export default NewInstallBanner;

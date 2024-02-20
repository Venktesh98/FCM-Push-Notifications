import React, { useState, useEffect } from "react";

function NewInstallBanner() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Detect mobile browser
    const isMobileBrowser =
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      ) && navigator.userAgent.match(/Chrome|Firefox|Safari/i);

    // Handle beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault(); // Prevent native banner
      if (isMobileBrowser) {
        setShowInstallButton(true);
      }
    });

    // Check if app is already installed
    if (localStorage.getItem("appInstalled")) {
      setIsAppInstalled(true);
    }
  }, []);

  // Handle install button click
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setIsAppInstalled(true);
          localStorage.setItem("appInstalled", true);
          deferredPrompt = null;
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

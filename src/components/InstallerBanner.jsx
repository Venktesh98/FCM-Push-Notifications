// components/InstallBanner.js

import React, { useState, useEffect } from "react";

function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleEligibilityChange = () => {
      // Check if the app is eligible for installation
      if (window.hasOwnProperty("beforeinstallprompt")) {
        setShowBanner(true);
        // Add event listener for deferred prompt (optional)
        window.addEventListener("beforeinstallprompt", handleInstallPrompt);
      } else {
        setShowBanner(false);
      }
    };

    handleEligibilityChange();

    return () =>
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
  };

  const handleInstallPrompt = (event) => {
    event.preventDefault();
    // Store the event for later prompt
    window.deferredPrompt = event;
  };

  const handleInstall = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      // Optional: Track installation success/failure
      window.deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("PWA installed!");
        } else {
          console.log("PWA installation declined.");
        }
      });
    }
  };

  return showBanner ? (
    <div className="install-banner">
      <p>Install this app for offline access, faster loading, and more!</p>
      <button onClick={handleDismiss}>Close</button>
      <button onClick={handleInstall}>Install</button>
    </div>
  ) : null;
}

export default InstallBanner;

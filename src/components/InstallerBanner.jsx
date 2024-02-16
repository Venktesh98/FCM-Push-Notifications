// components/InstallBanner.js

import React, { useState, useEffect } from "react";

function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleEligibilityChange = () => {
      // Check if the app is eligible for installation
      console.log("In checking eligibility prompt");

      window.addEventListener("beforeinstallprompt", handleInstallPrompt);

      return () => {
        window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      };
    };

    handleEligibilityChange();
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
  };

  const handleInstallPrompt = (event) => {
    console.log("In install prompt");
    // event.preventDefault();
    setShowBanner(true);
    // Store the event for later prompt
    window.deferredPrompt = event;
  };

  const handleInstall = () => {
    console.log("In install function");
    if (window.deferredPrompt) {
      console.log("In install function if...");

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

  console.log("Banner value:", showBanner);

  return showBanner ? (
    <div className="install-banner">
      <p>Install this app for offline access, faster loading, and more!</p>
      <button onClick={handleDismiss}>Close</button>
      <button onClick={handleInstall}>Install</button>
    </div>
  ) : null;
}

export default InstallBanner;

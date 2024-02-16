import React, { useEffect } from "react";

const InstallerBanner = () => {
  let deferredPrompt;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log("beforeinstallprompt Event fired");
      e.preventDefault();
      deferredPrompt = e;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []); // Ensure the event listener is added only once on mount

  const handleInstallBanner = () => {
    if (typeof window !== "undefined" && deferredPrompt !== undefined) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome === "dismissed") {
          console.log("User cancelled home screen install");
        } else {
          console.log("User added to home screen");
        }

        deferredPrompt = null;
      });
    }
  };

  return (
    <div>
      <button onClick={handleInstallBanner}>Click for the banner</button>
    </div>
  );
};

export default InstallerBanner;

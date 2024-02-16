// var deferredPrompt;

// window.addEventListener("beforeinstallprompt", function (e) {
//   console.log("beforeinstallprompt Event fired");
//   e.preventDefault();

//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;

//   return false;
// });

// btnSave.addEventListener("click", function () {
//   if (deferredPrompt !== undefined) {
//     // The user has had a postive interaction with our app and Chrome
//     // has tried to prompt previously, so let's show the prompt.
//     deferredPrompt.prompt();

//     // Follow what the user has done with the prompt.
//     deferredPrompt.userChoice.then(function (choiceResult) {
//       console.log(choiceResult.outcome);

//       if (choiceResult.outcome == "dismissed") {
//         console.log("User cancelled home screen install");
//       } else {
//         console.log("User added to home screen");
//       }

//       // We no longer need the prompt.  Clear it up.
//       deferredPrompt = null;
//     });
//   }
// });

import React from "react";

const InstallerBanner = () => {
  var deferredPrompt;

  if (typeof window === "undefined") {
    window.addEventListener("beforeinstallprompt", function (e) {
      console.log("beforeinstallprompt Event fired");
      e.preventDefault();

      // Stash the event so it can be triggered later.
      deferredPrompt = e;

      return false;
    });
  }

  const handleInstallBanner = () => {
    if (deferredPrompt !== undefined) {
      // The user has had a postive interaction with our app and Chrome
      // has tried to prompt previously, so let's show the prompt.
      deferredPrompt.prompt();

      // Follow what the user has done with the prompt.
      deferredPrompt.userChoice.then(function (choiceResult) {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome == "dismissed") {
          console.log("User cancelled home screen install");
        } else {
          console.log("User added to home screen");
        }

        // We no longer need the prompt.  Clear it up.
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

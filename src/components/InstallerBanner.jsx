import { useDeferredValue } from "next/dynamic";

function InstallBanner() {
  const deferredPrompt = useDeferredValue(() =>
    window.matchMedia("(display-mode: standalone)").matches ? null : undefined
  );

  useEffect(() => {
    if (deferredPrompt) {
      const handleBeforeInstallPrompt = (event) => {
        event.preventDefault();
        setInstallPrompt(event);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () =>
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
    }
  }, [deferredPrompt]);

  const [installPrompt, setInstallPrompt] = useState(null);

  const handleClickInstall = () => {
    if (installPrompt) {
      installPrompt.prompt();
    }
  };

  return (
    <div className="install-banner">
      <h2>Install App</h2>
      <p>Click "Install" to add this app to your home screen.</p>
      <button onClick={handleClickInstall}>Install</button>
    </div>
  );
}

export default InstallBanner;

import InstallBanner from "@/components/InstallerBanner";
import NewInstallBanner from "@/components/NewInstallBanner";
import ThirdInstaller from "@/components/ThirdInstaller";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      {/* <InstallBanner /> */}
      {/* <NewInstallBanner /> */}
      <ThirdInstaller />
      <Component {...pageProps} />
    </div>
  );
}

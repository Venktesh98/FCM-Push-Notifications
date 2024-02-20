import InstallBanner from "@/components/InstallerBanner";
import NewInstallBanner from "@/components/NewInstallBanner";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      {/* <InstallBanner /> */}
      <NewInstallBanner />
      <Component {...pageProps} />
    </div>
  );
}

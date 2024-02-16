import InstallBanner from "@/components/InstallerBanner";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <InstallBanner />
      <Component {...pageProps} />
    </div>
  );
}

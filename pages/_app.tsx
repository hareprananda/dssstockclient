import "../styles/globals.css";
import type { AppProps } from "next/app";
import InitialLayout from "src/layout/InitialLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InitialLayout>
      <Component {...pageProps} />
    </InitialLayout>
  );
}
export default MyApp;

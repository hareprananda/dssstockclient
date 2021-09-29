import "../styles/globals.css";
import type { AppProps } from "next/app";
import InitialLayout from "src/components/layout/InitialLayout";
import ReduxProvider from "src/redux/ReduxProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InitialLayout>
      <ReduxProvider>
        <Component {...pageProps} />
      </ReduxProvider>
    </InitialLayout>
  );
}
export default MyApp;

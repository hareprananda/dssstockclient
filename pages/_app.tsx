import "../styles/globals.css";
import type { AppProps } from "next/app";
import ReduxProvider from "src/redux/ReduxProvider";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import LoaderOverlay from "src/components/Loader/LoaderOverlay";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ReduxProvider>
      {" "}
      <LoaderOverlay /> {getLayout(<Component {...pageProps} />)}
    </ReduxProvider>
  );
}
export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import InitialLayout from "src/components/layout/InitialLayout";
import ReduxProvider from "src/redux/ReduxProvider";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ReduxProvider> {getLayout(<Component {...pageProps} />)}</ReduxProvider>
  );
}
export default MyApp;

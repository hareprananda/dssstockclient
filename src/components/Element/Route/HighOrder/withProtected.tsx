import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "src/components/layout/DashboardLayout";
import { RouteUrl } from "src/route/RouteUrl";
import { Page } from "src/types/Page";
import LocalStorage from "src/utils/localstorage/LocalStorage";

type TwithProtected = (
  WrappedComponent: Page,
  Layout?: React.FC
) => (props: any) => JSX.Element | Promise<boolean> | null;

const withProtected: TwithProtected = (
  WrappedComponent,
  Layout = DashboardLayout
) => {
  const WithProtected = (props: any) => {
    const router = useRouter();
    if (typeof window === "undefined") return null;

    const user_data = LocalStorage.get("user_data");
    if (!user_data) {
      router.replace(RouteUrl.login);
      return null;
    }
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
  return WithProtected;
};

export default withProtected;

import { useRouter } from "next/router";
import React from "react";
import { RouteUrl } from "src/route/RouteUrl";
import LocalStorage from "src/utils/localstorage/LocalStorage";

type TwithProtected = (
  WrappedComponent: React.FC
) => (props: any) => JSX.Element | Promise<boolean> | null;

const withProtected: TwithProtected = (WrappedComponent) => {
  const WithProtected = (props: any) => {
    const router = useRouter();
    if (typeof window === "undefined") return null;

    const user_data = LocalStorage.get("user_data");
    if (!user_data) {
      router.replace(RouteUrl.login);
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return WithProtected;
};

export default withProtected;

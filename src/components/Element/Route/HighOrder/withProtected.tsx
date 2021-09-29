import { useRouter } from "next/router";
import React from "react";
import { RouteUrl } from "src/route/RouteUrl";
import LocalStorage from "src/utils/localstorage/LocalStorage";

type TwithProtected = (
  WrappedComponent: React.FC
) => (props: any) => JSX.Element | Promise<boolean> | null;

const withProtected: TwithProtected = (WrappedComponent) => {
  return (props) => {
    if (typeof window === "undefined") return null;

    const router = useRouter();
    const user_data = LocalStorage.get("user_data");
    if (!user_data) {
      router.replace(RouteUrl.login);
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withProtected;

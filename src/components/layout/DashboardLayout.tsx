import React, { useEffect } from "react";
import DashboardHeader from "assets/svg/dashboard_header.svg";
import FixedImageWrapper from "../Image/FixedImageWrapper";
import { useAppDispatch, useAppSelector } from "src/redux/ReduxHook";
import Icon from "src/assets/Icon";
import Link from "next/link";
import { RouteUrl } from "src/route/RouteUrl";
import ReducerActions from "src/redux/ReducerAction";
import { useRouter } from "next/router";
import LocalStorage from "src/utils/localstorage/LocalStorage";
import useGoogleAuth from "src/hooks/useGoogleAuth";
import UIState from "src/redux/UIReducer/UIState";
import { useWindowResize } from "src/hooks/useWindowResize";

type TypeUIState = typeof UIState;

const DashboardLayout: React.FC = ({ children }) => {
  const {
    ui: { activeBottomNavbar },
  } = useAppSelector((state) => state);
  const { signOut } = useGoogleAuth();

  const { width } = useWindowResize();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const changeNavbar = (type: TypeUIState["activeBottomNavbar"]) => () => {
    dispatch(ReducerActions.ui.changeActiveBottomNavbar(type));
  };

  useEffect(() => {
    const pathName = router.pathname as typeof RouteUrl[keyof typeof RouteUrl];
    let dispatchValue: TypeUIState["activeBottomNavbar"] = "home";
    if (pathName === RouteUrl.list || /\/dashboard\/stock/g.test(pathName))
      dispatchValue = "list";
    else if (pathName === RouteUrl.upload) dispatchValue = "upload";
    dispatch(ReducerActions.ui.changeActiveBottomNavbar(dispatchValue));
  }, []);

  const userData = LocalStorage.get("user_data");
  return (
    <div className="dashboardLayout">
      <div>
        <FixedImageWrapper
          top={0}
          right={0}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            position: "fixed",
            zIndex: 20,
          }}
        >
          <div style={{ position: "absolute", top: "0", zIndex: -1 }}>
            <DashboardHeader
              width="100%"
              height="130px"
              style={{ minWidth: "665px" }}
            />
          </div>
          <img
            alt="Auth Image"
            src={userData?.imageUrl}
            className="mt-2 mx-3 border-2 border-gray-50"
            style={{ borderRadius: "50%", width: "48px", height: "48px" }}
            referrerPolicy="no-referrer"
          />
          {width < 600 ? null : (
            <p className="text-white text-2xl">{userData?.name}</p>
          )}
        </FixedImageWrapper>
      </div>
      <div
        className="max-w mx-auto px-2 md:px-5"
        style={{ maxWidth: "1665px" }}
      >
        {children}
      </div>
      <div className="w-full h-20"></div>
      <div className="fixed bottom-0 w-full grid place-items-center">
        <div
          className={`dashboardLayout__bottomNavbar ${
            userData?.level === "admin" ? "admin__navbar" : "user__navbar"
          }`}
        >
          <Link href={RouteUrl.dashboard}>
            <a
              onClick={changeNavbar("home")}
              className={`px-5 pb-2 pt-4 ${
                activeBottomNavbar === "home" && "bg-white"
              }`}
            >
              <Icon.StatisticIcon
                style={{ fontSize: "20px" }}
                fill={activeBottomNavbar === "home" ? "#0057b5" : "white"}
              />
            </a>
          </Link>
          <Link href={RouteUrl.list}>
            <a
              onClick={changeNavbar("list")}
              className={`px-5 pb-2 pt-4 ${
                activeBottomNavbar === "list" && "bg-white"
              }`}
            >
              <Icon.ListIcon
                fill={activeBottomNavbar === "list" ? "#0057b5" : "white"}
              />
            </a>
          </Link>
          {userData?.level === "admin" && (
            <Link href={RouteUrl.upload}>
              <a
                onClick={changeNavbar("upload")}
                className={`px-5 pb-2 pt-4 ${
                  activeBottomNavbar === "upload" && "bg-white"
                }`}
              >
                <Icon.UploadIcon
                  fill={activeBottomNavbar === "upload" ? "#0057b5" : "white"}
                />
              </a>
            </Link>
          )}
          <div className={`px-5 pb-2 pt-4 cursor-pointer`} onClick={signOut}>
            <Icon.LogoutIcon fill="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

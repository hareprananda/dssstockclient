import React, { useEffect } from "react";
import DashboardHeader from "assets/svg/dashboard_header.svg";
import FixedImageWrapper from "../Image/FixedImageWrapper";
import { useAppDispatch, useAppSelector } from "src/redux/ReduxHook";
import Icon from "src/assets/Icon";
import Link from "next/link";
import { RouteUrl } from "src/route/RouteUrl";
import ReducerActions from "src/redux/ReducerAction";
import { TypeUIState } from "src/redux/UIReducer/UIState";
import { useRouter } from "next/router";

const DashboardLayout: React.FC = ({ children }) => {
  const {
    auth,
    ui: { activeBottomNavbar },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const changeNavbar = (type: TypeUIState["activeBottomNavbar"]) => () => {
    dispatch(ReducerActions.ui.changeActiveBottomNavbar(type));
  };

  useEffect(() => {
    const pathName = router.pathname as typeof RouteUrl[keyof typeof RouteUrl];
    let dispatchValue: TypeUIState["activeBottomNavbar"] = "home";
    if (pathName === RouteUrl.list) dispatchValue = "list";
    else if (pathName === RouteUrl.upload) dispatchValue = "upload";
    dispatch(ReducerActions.ui.changeActiveBottomNavbar(dispatchValue));
  }, []);
  return (
    <div>
      <div>
        <FixedImageWrapper
          top={0}
          right={0}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            position: "fixed",
            zIndex: 50,
          }}
        >
          <div style={{ position: "absolute", top: "0", zIndex: -1 }}>
            <DashboardHeader width="100%" height="130px" />
          </div>
          <img
            alt="Auth Image"
            src={auth.imgUrl}
            className="mt-2 mx-3"
            style={{ borderRadius: "50%", width: "48px", height: "48px" }}
            referrerPolicy="no-referrer"
          />
          <p className="text-white text-2xl">{auth.name}</p>
        </FixedImageWrapper>
      </div>
      <div className="max-w mx-auto px-5" style={{ maxWidth: "1665px" }}>
        {children}
      </div>
      <div className="w-full h-20"></div>
      <div className="fixed bottom-0 w-full grid place-items-center">
        <div
          className="mx-auto flex bg-primary border-primary border-2 overflow-hidden"
          style={{ borderRadius: "20px 20px 0 0" }}
        >
          <Link href={RouteUrl.dashboard}>
            <a
              onClick={changeNavbar("home")}
              className={`px-5 pb-2 pt-4 ${
                activeBottomNavbar === "home" && "bg-white"
              }`}
            >
              <Icon.StatisticIcon
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
          <div className={`px-5 pb-2 pt-4`}>
            <Icon.LogoutIcon fill="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

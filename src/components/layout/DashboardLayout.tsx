import React from "react";
import DashboardHeader from "assets/svg/dashboard_header.svg";
import FixedImageWrapper from "../Image/FixedImageWrapper";
import { useAppDispatch, useAppSelector } from "src/redux/ReduxHook";
import Icon from "src/assets/Icon";
import ReducerActions from "src/redux/ReducerAction";

const DashboardLayout: React.FC = ({ children }) => {
  const {
    auth,
    ui: { activeBottomNavbar },
  } = useAppSelector((state) => state);

  return (
    <div>
      <FixedImageWrapper
        top={0}
        right={0}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
          position: "fixed",
        }}
      >
        <div style={{ position: "absolute", top: "0", zIndex: -1 }}>
          <DashboardHeader width="100%" height="130px" />
        </div>
        <img
          src={auth.imgUrl}
          className="mt-2 mx-3"
          style={{ borderRadius: "50%", width: "48px", height: "48px" }}
          referrerPolicy="no-referrer"
        />
        <p className="text-white text-2xl">{auth.name}</p>
      </FixedImageWrapper>

      <div className="max-w mx-auto px-5" style={{ maxWidth: "1665px" }}>
        {children}
      </div>
      <div className="fixed bottom-0 w-full grid place-items-center">
        <div
          className="mx-auto flex bg-primary border-primary border-2 overflow-hidden"
          style={{ borderRadius: "20px 20px 0 0" }}
        >
          <div
            className={`px-5 pb-2 pt-4 ${
              activeBottomNavbar === "home" && "bg-white"
            }`}
          >
            <Icon.StatisticIcon
              fill={activeBottomNavbar === "home" ? "#0057b5" : "white"}
            />
          </div>
          <div
            className={`px-5 pb-2 pt-4 ${
              activeBottomNavbar === "list" && "bg-white"
            }`}
          >
            <Icon.ListIcon
              fill={activeBottomNavbar === "list" ? "#0057b5" : "white"}
            />
          </div>
          <div
            className={`px-5 pb-2 pt-4 ${
              activeBottomNavbar === "upload" && "bg-white"
            }`}
          >
            <Icon.UploadIcon
              fill={activeBottomNavbar === "upload" ? "#0057b5" : "white"}
            />
          </div>
          <div className={`px-5 pb-2 pt-4`}>
            <Icon.LogoutIcon fill="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

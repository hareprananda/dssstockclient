import React from "react";
import { useAppSelector } from "src/redux/ReduxHook";
import Loader from "./Loader";

const LoaderOverlay = () => {
  const showLoader = useAppSelector((state) => state.ui.mainLoader);
  return (
    showLoader && (
      <div className="fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-50 z-60 grid place-items-center">
        <Loader />
      </div>
    )
  );
};

export default LoaderOverlay;

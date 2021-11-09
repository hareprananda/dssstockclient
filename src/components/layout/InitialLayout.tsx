import React, { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import BottomDecoration from "assets/svg/homeBottomDecoration.svg";
import BottomLeftDecoration from "assets/svg/homeBottomLeftDecoration.svg";
import FixedImageWrapper from "src/components/Image/FixedImageWrapper";
import Header from "assets/svg/homeHeader.svg";
import HomeBackground from "assets/HomeBackground.png";
import { useRouter } from "next/router";
import LocalStorage from "src/utils/localstorage/LocalStorage";
import { RouteUrl } from "src/route/RouteUrl";
import Icon from "src/assets/Icon";
import { useAppDispatch } from "src/redux/ReduxHook";
import ReducerActions from "src/redux/ReducerAction";
import BackDrop from "src/components/Element/Backdrop/Backdrop";
import { useWindowResize } from "src/hooks/useWindowResize";
const InitialLayout: FC = ({ children }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { width } = useWindowResize();
  useEffect(() => {
    dispatch(ReducerActions.ui.setBackDrop(true));
  }, []);

  const toggleMenu = () => {
    setShowMenu((current) => !current);
  };
  useEffect(() => {
    const menuRefEl = menuRef.current;
    if (width === 0) return;
    if (menuRefEl && width <= 600) {
      menuRefEl.style.top = showMenu ? "0" : "-200px";
    }
  }, [showMenu]);

  if (typeof window !== "undefined") {
    const userStorage = LocalStorage.get("user_data");
    if (userStorage) {
      router.push(RouteUrl.dashboard);
      return null;
    }
  }

  return (
    <div className="initialLayout-container">
      <div className="flex-row-reverse initialLayout-headerContainer">
        <BackDrop show={showMenu} click={toggleMenu} />
        <Header className="initialLayout__header-svg" />
        <div
          className="initialLayout-menu__container"
          ref={menuRef}
          style={{ zIndex: 90 }}
        >
          <p className="text-primary bg-gray font-bold text-2xl">Login</p>
          <p className="text-softPrimary text-2xl">About</p>
          <p className="text-softPrimary text-2xl">Contact</p>
        </div>
        <div className="initialLayout-menu__bar" onClick={toggleMenu}>
          <Icon.BarMenu width="30px" height="30px" fill="#0065c5" />
        </div>
      </div>
      <div className="initialLayout-header__separator" />
      <div className="initialLayout-mainIcon">
        <div style={{ maxWidth: "1000px", width: "55vw" }}>
          <Image
            src={HomeBackground}
            width={1226}
            height={667}
            placeholder="blur"
            priority
            loading="eager"
            alt="Home Background"
          />
        </div>
      </div>

      <FixedImageWrapper style={{ zIndex: -1 }} bottom={-10}>
        <BottomDecoration style={{ maxHeight: "308px", height: "25vw" }} />
      </FixedImageWrapper>
      <FixedImageWrapper left={-60} bottom={-100} style={{ zIndex: -1 }}>
        <BottomLeftDecoration style={{ maxWidth: "1054px" }} />
      </FixedImageWrapper>

      <div className="initialLayout-content__container">
        <h1 className="text-primary text-4xl initialLayout-header__title">
          stock<span className="font-bold">Screening</span>
        </h1>
        <div
          className="relative initialLayout-children__container"
          style={showMenu ? { zIndex: -1 } : {}}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default InitialLayout;

import React, { FC, useEffect, useState, useRef, useMemo } from "react";
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
import Link from "next/link";
const InitialLayout: FC = ({ children }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { width, height } = useWindowResize();

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

  useEffect(() => {
    if (height === 0) return;
    const bottomIcon1 = document.querySelector(
      ".initialLayout-bottomIcon1"
    ) as HTMLDivElement;
    const bottomIcon2 = document.querySelector(
      ".initialLayout-bottomIcon2"
    ) as HTMLDivElement;
    if (height < 675) {
      bottomIcon1.style.bottom = `-${685 - height}px`;
      bottomIcon2.style.bottom = `-${775 - height}px`;
    }
  }, [height]);

  const currentPath = router.asPath;
  const availableLink = useMemo(
    () => [
      {
        name: "Login",
        path: RouteUrl.login,
      },
      {
        name: "About",
        path: RouteUrl.about,
      },
      {
        name: "Contact",
        path: RouteUrl.contact,
      },
    ],
    []
  );

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
          {availableLink.map((link) => (
            <Link key={link.name} href={link.path}>
              <a
                className={`bg-gray text-2xl no-underline ${
                  new RegExp(`^${link.path}$`).test(currentPath)
                    ? "font-bold text-primary"
                    : "text-softPrimary"
                }`}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="initialLayout-menu__bar" onClick={toggleMenu}>
          <Icon.BarMenu width="30px" height="30px" fill="#0065c5" />
        </div>
      </div>
      <div className="initialLayout-header__separator" />
      {router.asPath.length === 1 && (
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
      )}

      <FixedImageWrapper
        style={{ zIndex: -1 }}
        bottom={-10}
        className="initialLayout-bottomIcon1"
      >
        <BottomDecoration style={{ maxHeight: "308px", height: "25vw" }} />
      </FixedImageWrapper>
      <FixedImageWrapper
        left={-60}
        bottom={-100}
        style={{ zIndex: -1 }}
        className="initialLayout-bottomIcon2"
      >
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

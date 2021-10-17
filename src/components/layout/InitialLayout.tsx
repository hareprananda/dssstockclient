import React, { FC } from "react";
import Image from "next/image";
import BottomDecoration from "assets/svg/homeBottomDecoration.svg";
import BottomLeftDecoration from "assets/svg/homeBottomLeftDecoration.svg";
import FixedImageWrapper from "src/components/Image/FixedImageWrapper";
import Header from "assets/svg/homeHeader.svg";
import HomeBackground from "assets/HomeBackground.png";
import { useRouter } from "next/router";
import LocalStorage from "src/utils/localstorage/LocalStorage";
import { RouteUrl } from "src/route/RouteUrl";
const InitialLayout: FC = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const userStorage = LocalStorage.get("user_data");
    if (userStorage) router.push(RouteUrl.dashboard);
  }
  return (
    <div>
      <FixedImageWrapper
        className="flex flex-row-reverse"
        top={-50}
        right={-70}
      >
        <Header style={{ width: "1000px" }} />
        <div
          className="flex absolute bottom-60"
          style={{
            right: "120px",
          }}
        >
          <p className="text-primary bg-gray font-bold text-2xl">Login</p>
          <p
            style={{ marginLeft: "75px" }}
            className="text-softPrimary text-2xl"
          >
            About
          </p>
          <p
            style={{ marginLeft: "75px" }}
            className="text-softPrimary text-2xl"
          >
            Contact
          </p>
        </div>
      </FixedImageWrapper>
      <div
        style={{
          zIndex: 2,
          width: "100%",
          position: "absolute",
          paddingTop: "120px",
          paddingRight: "140px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div style={{ maxWidth: "1000px" }}>
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

      <FixedImageWrapper bottom={-10}>
        <BottomDecoration style={{ height: "308px" }} />
      </FixedImageWrapper>
      <FixedImageWrapper left={-60} bottom={-100} style={{ zIndex: 0 }}>
        <BottomLeftDecoration style={{ width: "1054px" }} />
      </FixedImageWrapper>

      <div className="px-12 pt-9">
        <h1 className="text-primary text-4xl">
          stock<span className="font-bold">Screening</span>
        </h1>
        <div className="z-10 relative">{children}</div>
      </div>
    </div>
  );
};

export default InitialLayout;

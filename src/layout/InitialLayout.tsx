import React, { FC } from "react";
import Image from "next/image";
import BottomDecoration from "assets/svg/homeBottomDecoration.svg";
import InitialImageWrapper from "src/components/Image/InitialImageWrapper.styled";
const InitialLayout: FC = ({ children }) => {
  return (
    <div>
      <h1>Initial layout</h1>
      <InitialImageWrapper bottom={-10}>
        <Image src={BottomDecoration} />
      </InitialImageWrapper>

      {children}
    </div>
  );
};

export default InitialLayout;

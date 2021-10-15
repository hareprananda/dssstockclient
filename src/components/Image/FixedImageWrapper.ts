import { HTMLAttributes } from "react";
import styled, { CSSProp } from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
  width?: CSSProp;
}

const FixedImageWrapper = styled.div<Props>`
  position: fixed;
  width: 100vw;
  bottom: ${({ bottom }) => bottom + "px" || "auto"};
  top: ${({ top }) => top + "px" || "auto"};
  left: ${({ left }) => left + "px" || "auto"};
  right: ${({ right }) => right + "px" || "auto"};
`;

export default FixedImageWrapper;

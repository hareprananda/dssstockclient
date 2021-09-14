import { CSSProperties, HTMLAttributes } from "react";
import styled, { CSSProp } from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
  width?: CSSProp;
}

const InitialImageWrapper = styled.div<Props>`
  position: fixed;
  width: 100vw;
  bottom: ${(props) => props.bottom + "px" || "auto"};
  top: ${(props) => props.top + "px" || "auto"};
  left: ${(props) => props.left + "px" || "auto"};
  right: ${(props) => props.right + "px" || "auto"};
`;

export default InitialImageWrapper;

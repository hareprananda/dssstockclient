import React from "react";

interface Props {
  show: boolean;
  click?: () => void;
  style?: React.CSSProperties;
}
const Backdrop: React.FC<Props> = ({ show, click, style }) => {
  return (
    <div
      className={`z-30 w-screen h-screen top-0 left-0 fixed opacity-100 ${
        !show && "hidden opacity-0"
      }`}
      onClick={click}
      style={{
        backgroundColor: "rgba(0, 0, 0,0.4)",
        transition: "opacity 0.5s",
        ...style,
      }}
    ></div>
  );
};

export default Backdrop;

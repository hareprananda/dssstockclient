import React, { useEffect, useRef } from "react";
import Icon from "src/assets/Icon";
import Backdrop from "src/components/Element/Backdrop/Backdrop";

interface Props {
  text: string;
  open: boolean;
  title: string;
  type: "success" | "error";
  toggleModal: () => void;
}

const StatusModal: React.FC<Props> = ({
  text,
  toggleModal,
  type,
  open,
  title,
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!modalContainerRef.current) return;
    const refElement = modalContainerRef.current;
    if (open) {
      refElement.style.display = "grid";
      refElement.style.opacity = "1";
    } else {
      refElement.style.opacity = "0";
      setTimeout(() => {
        refElement.style.display = "none";
      }, 500);
    }
  }, [open]);

  return (
    <>
      <Backdrop show={open} />
      <div
        ref={modalContainerRef}
        className="fixed w-screen left-0 top-0 h-screen grid place-items-center z-30"
        style={{ transition: "opacity 0.5s", opacity: "0", display: "none" }}
      >
        <div
          style={{}}
          className="bg-white w-11/12 max-w-3xl rounded-lg overflow-hidden"
        >
          <div
            className={`w-full ${type === "error" && "bg-red-500"} ${
              type === "success" && "bg-green-600"
            } grid place-items-center py-8 `}
          >
            <div className="border-4 border-white rounded-circle p-2">
              {type === "error" && <Icon.Close fill="white" />}
              {type === "success" && <Icon.Check fill="white" />}
            </div>
          </div>
          <div className="flex flex-col items-center py-5 px-5">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <p className="text-2xl mt-4 text-center">{text}</p>
            <button
              className="bg-yellow-400 mt-4  text-xl rounded px-4 py-2 text-white"
              onClick={toggleModal}
            >
              Okee
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusModal;

import React from "react";
import Icon from "src/assets/Icon";
import Backdrop from "src/components/Element/Backdrop/Backdrop";

interface Props {
  open: boolean;
  toggle: () => void;
  onSuccess: () => void;
  title: string;
  description?: string;
}

const ConfirmationModal: React.FC<Props> = ({
  open,
  toggle,
  onSuccess,
  title,
  description,
}) => {
  return (
    <>
      <Backdrop show={open} style={{ zIndex: 80 }} />
      <div
        style={{
          left: "50%",
          top: "10%",
          transform: "translate(-50%, 0)",
          zIndex: 90,
        }}
        className={`md:max-w-xl md:w-full absolute bg-white z-50 border-2 border-gray-500 rounded-lg px-6 py-4 ${
          !open && "hidden"
        } `}
      >
        <div className="border-b-2 border-gray-200 py-2 flex justify-between items-center">
          <h1 className="text-primary font-bold text-2xl">{title}</h1>
          <div className="cursor-pointer" onClick={toggle}>
            <Icon.CancelIcon
              width="22.309"
              height="22.309"
              fill="rgba(0,0,0,0.4)"
            />
          </div>
        </div>
        <p className="mt-3 mb-6">{description}</p>

        <div className="flex justify-between py-3">
          <button
            className="text-primary bg-softPrimary2 rounded px-5 py-2 font-semibold"
            type="button"
            onClick={toggle}
          >
            Batal
          </button>
          <button
            onClick={onSuccess}
            type="submit"
            className="bg-primary text-white rounded px-5 py-2 font-semibold"
          >
            Yaa
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;

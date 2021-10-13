import React from "react";
import Icon from "src/assets/Icon";
import Backdrop from "src/components/Element/Backdrop/Backdrop";

interface Props {
  open: boolean;
  toggle: () => void;
}

const TickerTableModal: React.FC<Props> = ({ open, toggle }) => {
  return (
    <>
      <Backdrop show={open} />
      <div
        style={{
          left: "50%",
          top: "10%",
          transform: "translate(-50%, 0)",
        }}
        className={`md:max-w-xl md:w-full absolute bg-white z-50 border-2 border-gray-500 rounded-lg px-6 py-4 ${
          !open && "hidden"
        } `}
      >
        <div className="border-b-2 border-gray-200 py-2 flex justify-between items-center">
          <h1 className="text-primary font-bold text-2xl">Laporan Keuangan</h1>
          <div className="cursor-pointer" onClick={toggle}>
            <Icon.CancelIcon width="22.309" height="22.309" fill="black" />
          </div>
        </div>

        <form>
          {[
            "Ekuitas",
            "Laba bersih",
            "Utang Lancar",
            "Aset Lancar",
            "Dividen",
          ].map((value) => (
            <div className="mb-4 mt-2">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor={value}
              >
                {value}
              </label>
              <input
                className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={value}
                type="text"
                placeholder={value}
              />
            </div>
          ))}

          <div className="flex justify-between py-3">
            <button
              className="text-primary bg-softPrimary2 rounded px-3 py-2 font-semibold"
              type="button"
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={toggle}
              className="bg-primary text-white rounded px-3 py-2 font-semibold"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TickerTableModal;

import React, { useEffect, useState } from "react";
import Icon from "src/assets/Icon";
import Backdrop from "src/components/Element/Backdrop/Backdrop";

interface Props {
  open: boolean;
  toggle: () => void;
  data: { ticker: string; nama: string };
  onSubmit: (data: { harga: string; jumlahSaham: string }) => void;
  onCancel: () => void;
}

const NewCompanyModal: React.FC<Props> = ({
  open,
  toggle,
  data,
  onSubmit,
  onCancel,
}) => {
  const [inputData, setInputData] = useState({
    harga: "0",
    jumlahSaham: "0",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputData);
  };

  useEffect(() => {
    setInputData({
      harga: "0",
      jumlahSaham: "0",
    });
  }, [data]);

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
          <div>
            <h1 className="text-primary font-bold text-2xl">
              Harga dan jumlah saham {data.ticker}
            </h1>
            <p className="text-gray-600 text-base">{data.nama}</p>
          </div>

          <div className="cursor-pointer" onClick={toggle}>
            <Icon.CancelIcon
              width="22.309"
              height="22.309"
              fill="rgba(0,0,0,0.4)"
            />
          </div>
        </div>
        <form onSubmit={submitData}>
          <div className="mb-4 mt-2" key={"harga"}>
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor={"harga"}
            >
              Harga
            </label>
            <input
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={"harga"}
              name={"harga"}
              onChange={onChangeInput}
              type="text"
              value={inputData["harga"]}
            />
          </div>

          <div className="mb-4 mt-2" key={"jumlahSaham"}>
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor={"jumlahSaham"}
            >
              Jumlah Saham
            </label>
            <input
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={"jumlahSaham"}
              name={"jumlahSaham"}
              onChange={onChangeInput}
              type="text"
              value={inputData["jumlahSaham"]}
            />
          </div>

          <div className="flex justify-between py-3">
            <button
              className="text-primary bg-softPrimary2 rounded px-5 py-2 font-semibold"
              type="button"
              onClick={onCancel}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-primary text-white rounded px-5 py-2 font-semibold"
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default NewCompanyModal;

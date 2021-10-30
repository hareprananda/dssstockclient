import React, { useEffect, useState } from "react";
import Icon from "src/assets/Icon";
import Backdrop from "src/components/Element/Backdrop/Backdrop";
import useRequest from "src/hooks/useRequest";
import ConfigCompany from "src/request/Company/ConfigCompany";
import {
  CompanyData,
  ResponseCompanyUpdate,
} from "src/request/Company/RequestCompanyType";

interface Props {
  open: boolean;
  toggle: () => void;
  defaultData: CompanyData;
  successCB: (data: CompanyData) => void;
}

const CompanyModal: React.FC<Props> = ({
  open,
  toggle,
  defaultData,
  successCB,
}) => {
  const { RequestAuthenticated } = useRequest();

  const [inputData, setInputData] = useState<CompanyData>({
    _id: "",
    harga: 0,
    jumlahSaham: 0,
    nama: "",
  });

  useEffect(() => {
    setInputData(defaultData);
  }, [defaultData]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { _id: ticker, ...restInputData } = inputData;
    RequestAuthenticated<ResponseCompanyUpdate>(
      ConfigCompany.update(ticker, restInputData)
    )
      .then((res) => {
        toggle();
        successCB(res.data);
      })
      .catch(() => {
        alert("Oops something gone wrong");
      });
  };

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
          <h1 className="text-primary font-bold text-2xl">
            Update {inputData._id}
          </h1>
          <div className="cursor-pointer" onClick={toggle}>
            <Icon.CancelIcon
              width="22.309"
              height="22.309"
              fill="rgba(0,0,0,0.4)"
            />
          </div>
        </div>
        <form onSubmit={onSubmit}>
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
              type="number"
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
              type="number"
              value={inputData["jumlahSaham"]}
            />
          </div>
          <div className="mb-4 mt-2" key={"nama"}>
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor={"nama"}
            >
              Nama Perusahaan
            </label>
            <input
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={"nama"}
              name={"nama"}
              onChange={onChangeInput}
              type="text"
              value={inputData["nama"]}
            />
          </div>

          <div className="flex justify-between py-3">
            <button
              className="text-primary bg-softPrimary2 rounded px-3 py-2 font-semibold"
              type="button"
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              type="submit"
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

export default CompanyModal;

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Icon from "src/assets/Icon";
import Backdrop from "src/components/Element/Backdrop/Backdrop";
import useRequest from "src/hooks/useRequest";
import ReducerActions from "src/redux/ReducerAction";
import { useAppDispatch, useAppSelector } from "src/redux/ReduxHook";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import {
  ResponseDssSingleStock,
  ResponseDssUpdateFinancial,
} from "src/request/DSS/RequestDSSType";
import NumberUtils from "src/utils/number/NumberUtils";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const InputList = [
  {
    label: "Ekuitas",
    name: "ekuitas",
  },
  {
    label: "Laba Bersih",
    name: "labaBersih",
  },
  {
    label: "Utang Lancar",
    name: "utangLancar",
  },
  {
    label: "Aset Lancar",
    name: "asetLancar",
  },
  {
    label: "Adanya Dividen",
    name: "adanyaDividen",
  },
] as const;

type TypeDefaultData = ResponseDssSingleStock["detail"][number];

interface Props {
  open: boolean;
  defaultData: TypeDefaultData;
  toggle: () => void;
  onSuccess: (data: ResponseDssUpdateFinancial["data"]) => void;
}

const TickerTableModal: React.FC<Props> = ({
  open,
  toggle,
  defaultData,
  onSuccess,
}) => {
  const { RequestAuthenticated } = useRequest();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.ui.mainLoader);
  const [inputData, setInputData] = useState({} as TypeDefaultData);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  useEffect(() => {
    if (!defaultData) return;
    setInputData(defaultData);
  }, [defaultData]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputData || loading) return;
    const { adanyaDividen, ...restInputData } = inputData;
    const isInputCorrect = Object.values(restInputData).every(
      (value) => !!value.toString().trim()
    );
    if (!isInputCorrect) return alert("Semua field harus diisi dengan benar");
    dispatch(ReducerActions.ui.setMainLoader(true));
    const inputedData = { ...restInputData, dividen: adanyaDividen as 0 | 1 };
    RequestAuthenticated<ResponseDssUpdateFinancial>(
      ConfigDSS.updateFinancial(router.query.ticker as string, inputedData)
    )
      .then((res) => {
        onSuccess(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.error);
        }
      })
      .finally(() => {
        dispatch(ReducerActions.ui.setMainLoader(false));
        toggle();
      });
  };

  const toggleOpenConfirmation = () => {
    setOpenConfirmation((current) => !current);
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData((current) => ({
      ...current,
      [name]: value ? parseInt(value) : "",
    }));
  };
  const deleteSuccess = () => {
    dispatch(ReducerActions.ui.setMainLoader(true));

    RequestAuthenticated(ConfigDSS.eraseFinancial(defaultData._id))
      .then(() => {
        dispatch(ReducerActions.request.reRequestTickerDetail());
        alert("Laporan keuangan berhasil dihapus");
        toggle();
        toggleOpenConfirmation();
      })
      .catch(() => {
        alert("Oops something gone wrong");
      });
  };
  return (
    <>
      <ConfirmationModal
        title="Konfirmasi"
        description="Apakah anda yakin ingin menghapus laporan keuangan ini ?"
        open={openConfirmation}
        toggle={toggleOpenConfirmation}
        onSuccess={deleteSuccess}
      />
      <Backdrop show={open} />
      <div
        style={{
          left: "50%",
          top: "10%",
          transform: "translate(-50%, 0)",
        }}
        className={`max-w-screen-90 sm:max-w-screen-80 md:max-w-xl w-full absolute bg-white z-50 border-2 border-gray-500 rounded-lg px-6 py-4 ${
          !open && "hidden"
        } `}
      >
        <div className="border-b-2 border-gray-200 py-2 flex justify-between items-center">
          <h1 className="text-primary font-bold text-2xl">Laporan Keuangan</h1>
          <div className="cursor-pointer" onClick={toggle}>
            <Icon.CancelIcon
              width="22.309"
              height="22.309"
              fill="rgba(0,0,0,0.4)"
            />
          </div>
        </div>
        <p className="text-primary mt-2">
          * angka dalam {NumberUtils.pembulatan(defaultData?.pembulatan || 0)}
        </p>
        <form onSubmit={onSubmit}>
          {InputList.map((value) => (
            <div className="mb-4 mt-2" key={value.name}>
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor={value.name}
              >
                {value.label}
              </label>
              {value.name === "adanyaDividen" ? (
                <div className="grid grid-cols-2">
                  <div>
                    <label htmlFor="dividen__yes">Ada</label>
                    <input
                      id="dividen__yes"
                      className="ml-2"
                      type="radio"
                      name={value.name}
                      checked={inputData.adanyaDividen === 1}
                      onChange={onChangeInput}
                      value={1}
                    />
                  </div>
                  <div>
                    <label htmlFor="dividen__no">Tidak ada</label>
                    <input
                      id="dividen__no"
                      type="radio"
                      className="ml-2"
                      name={value.name}
                      checked={inputData.adanyaDividen === 0}
                      onChange={onChangeInput}
                      value={0}
                    />
                  </div>
                </div>
              ) : (
                <input
                  className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={value.name}
                  name={value.name}
                  onChange={onChangeInput}
                  type="number"
                  value={inputData[value.name]}
                />
              )}
            </div>
          ))}

          <div className="flex justify-between py-3">
            <button
              className="text-gray-50 bg-red-500 rounded px-3 py-2 font-semibold"
              type="button"
              onClick={toggleOpenConfirmation}
            >
              Hapus
            </button>
            <div className="flex">
              <button
                className="text-primary bg-softPrimary2 rounded px-3 py-2 font-semibold"
                type="button"
                onClick={toggle}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white rounded px-3 py-2 font-semibold ml-2"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TickerTableModal;

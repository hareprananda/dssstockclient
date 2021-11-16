import React, { useEffect, useState } from "react";
import StatusModal from "src/components/Modal/StatusModal/StatusModal";
import TickerTableModal from "src/components/Modal/TickerTableModal/TickerTableModal";
import {
  ResponseDssSingleStock,
  ResponseDssUpdateFinancial,
} from "src/request/DSS/RequestDSSType";
import LocalStorage from "src/utils/localstorage/LocalStorage";
import NumberUtils from "src/utils/number/NumberUtils";

interface Props {
  detailList: ResponseDssSingleStock["detail"];
  setDetailList: React.Dispatch<
    React.SetStateAction<ResponseDssSingleStock["detail"]>
  >;
}

const romanize = (angka: number) => {
  const roman = ["I", "II", "III", "IV"];
  return roman[angka - 1];
};

const TickerTable: React.FC<Props> = ({ detailList, setDetailList }) => {
  const [openModal, setOpenModal] = useState(false);
  const [availKey, setAvailKey] = useState<
    (keyof ResponseDssSingleStock["detail"][number])[]
  >([]);
  const [activeData, setActiveData] = useState<typeof detailList[number]>();
  const [detailListState, setDetailListState] = useState<typeof detailList>([]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const toggleSuccessModal = () => setOpenSuccessModal((current) => !current);
  const toggleModal = () => setOpenModal((current) => !current);

  useEffect(() => {
    if (detailList.length > 0) {
      setAvailKey(["ekuitas", "labaBersih", "utangLancar", "asetLancar"]);
      setDetailListState(detailList);
    }
  }, [detailList]);

  const tableValue = (key: keyof ResponseDssSingleStock["detail"][number]) => {
    const temp: JSX.Element[] = [];

    for (let i = 0; i < detailList.length; i++) {
      temp.push(
        <td className="p-2">Rp.{NumberUtils.separator(detailList[i][key])}</td>
      );
    }
    return temp;
  };

  const dataName = (name: string) => {
    switch (name) {
      case "ekuitas":
        return "Ekuitas";
      case "labaBersih":
        return "Laba Bersih";
      case "utangLancar":
        return "Utang Lancar";
      case "asetLancar":
        return "Aset Lancar";
    }
  };

  const chooseUpdate = (id: number) => {
    const usedData = detailList.find((data) => data._id === id);
    if (!usedData) return;
    setActiveData(usedData);
    toggleModal();
  };

  const onUpdateSuccess = (data: ResponseDssUpdateFinancial["data"]) => {
    let find = detailList.find((detail) => detail._id === data._id);
    if (find) {
      const id = find._id;
      find = {
        ...find,
        ekuitas: data.ekuitas,
        labaBersih: data.labaBersih,
        utangLancar: data.utangLancar,
        asetLancar: data.asetLancar,
      };
      const targetData = find;
      const newList = detailList.map((list) =>
        list._id === id ? targetData : list
      );

      setDetailList([...newList]);
      toggleSuccessModal();
    }
  };

  const userData = LocalStorage.get("user_data");
  return (
    <div>
      <StatusModal
        title={"Sukses"}
        type={"success"}
        text={"Data berhasil diubah"}
        open={openSuccessModal}
        toggleModal={toggleSuccessModal}
      />
      <TickerTableModal
        onSuccess={onUpdateSuccess}
        defaultData={activeData as typeof detailList[number]}
        open={openModal}
        toggle={toggleModal}
      />
      {detailList.length > 0 && (
        <p className="text-primary">
          * disajikan dalam{" "}
          {NumberUtils.pembulatan(detailList[detailList.length - 1].pembulatan)}
        </p>
      )}
      <div className="max-w-full overflow-auto">
        <table className="w-full mt-5">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-300">
              <td className="p-2 w-1/12"></td>
              {detailListState.map((data) => (
                <td className="w-1/5 p-2" key={data._id}>
                  <span
                    onClick={() =>
                      userData?.level === "admin" && chooseUpdate(data._id)
                    }
                    className="bg-primary text-white text-xl p-1 rounded cursor-pointer"
                  >
                    Kuartal {romanize(data.periode)} {data.tahun}
                  </span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {availKey.map((value) => {
              return (
                <tr
                  key={value}
                  className="text-primary border-b-2 border-gray-300"
                >
                  <td className="p-2 font-bold text-primary">
                    {dataName(value)}
                  </td>
                  {tableValue(
                    value as keyof ResponseDssSingleStock["detail"][number]
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TickerTable;

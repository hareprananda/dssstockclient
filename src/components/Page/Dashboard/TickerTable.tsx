import React, { useEffect, useMemo, useState } from "react";
import TickerTableModal from "src/components/Modal/TickerTableModal/TickerTableModal";
import { ResponseDssSingleStock } from "src/request/DSS/RequestDSSType";
import NumberUtils from "src/utils/number/NumberUtils";

interface Props {
  detailList: ResponseDssSingleStock["detail"];
}

const romanize = (angka: number) => {
  const roman = ["I", "II", "III", "IV"];
  console.log(angka);
  return roman[angka - 1];
};

const TickerTable: React.FC<Props> = ({ detailList }) => {
  const [openModal, setOpenModal] = useState(false);
  const [availKey, setAvailKey] = useState<
    (keyof ResponseDssSingleStock["detail"][number])[]
  >([]);

  const toggleModal = () => setOpenModal((current) => !current);

  useEffect(() => {
    if (detailList.length > 0) {
      setAvailKey(["ekuitas", "labaBersih", "utangLancar", "asetLancar"]);
    }
  }, [detailList]);

  const pembagi = useMemo(() => {
    let pembagiResult = 1;
    if (detailList.length > 0) {
      const pembulatan = detailList[detailList.length - 1].pembulatan;
      if (pembulatan !== 1) pembagiResult = Math.pow(10, pembulatan);
    }
    return pembagiResult;
  }, [detailList]);

  const tableValue = (key: keyof ResponseDssSingleStock["detail"][number]) => {
    const temp: JSX.Element[] = [];

    for (let i = 0; i < detailList.length; i++) {
      temp.push(
        <td className="p-2">
          Rp.{NumberUtils.separator(detailList[i][key] / pembagi)}
        </td>
      );
    }
    return temp;
  };

  return (
    <div>
      <TickerTableModal open={openModal} toggle={toggleModal} />
      {detailList.length > 0 && (
        <p className="text-primary">
          * disajikan dalam{" "}
          {NumberUtils.pembulatan(detailList[detailList.length - 1].pembulatan)}
        </p>
      )}
      <table className="w-full mt-5">
        <thead>
          <tr className="border-b-2 border-t-2 border-gray-300">
            <td className="p-2 w-1/12"></td>
            {detailList.map((data) => (
              <td className="w-1/5 p-2" key={data._id}>
                <span
                  onClick={toggleModal}
                  className="bg-primary text-white text-xl px-4 py-1 rounded cursor-pointer"
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
                <td className="p-2 font-bold text-primary">{value}</td>
                {tableValue(
                  value as keyof ResponseDssSingleStock["detail"][number]
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TickerTable;

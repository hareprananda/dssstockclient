import React, { useState } from "react";
import TickerTableModal from "src/components/Modal/TickerTableModal/TickerTableModal";

const TickerTable = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal((current) => !current);

  return (
    <div>
      <TickerTableModal open={openModal} toggle={toggleModal} />
      <p className="text-primary mt-10">Angka Dalam jutaan rupiah</p>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-t-2 border-gray-300">
            <td className="w-1/5 p-2"></td>
            <td className="w-1/5 p-2">
              <span
                onClick={toggleModal}
                className="bg-primary text-white text-xl px-4 py-1 rounded cursor-pointer"
              >
                Kuartal IV 2020
              </span>
            </td>
            <td className="w-1/5 p-2">
              <span
                onClick={toggleModal}
                className="bg-primary text-white text-xl px-4 py-1 rounded cursor-pointer"
              >
                Kuartal IV 2020
              </span>
            </td>
            <td className="w-1/5 p-2">
              <span
                onClick={toggleModal}
                className="bg-primary text-white text-xl px-4 py-1 rounded cursor-pointer"
              >
                Kuartal IV 2020
              </span>
            </td>
            <td className="w-1/5 p-2">
              <span
                onClick={toggleModal}
                className="bg-primary text-white text-xl px-4 py-1 rounded cursor-pointer"
              >
                Kuartal IV 2020
              </span>
            </td>
          </tr>
        </thead>
        <tbody>
          {[
            "Ekuitas",
            "Laba Bersih",
            "Utang Lancar",
            "Asset Lancar",
            "Dividen",
          ].map((value) => {
            return (
              <tr
                key={value}
                className="text-primary border-b-2 border-gray-300"
              >
                <td className="p-2">{value}</td>
                <td className="p-2">2000</td>
                <td className="p-2">2000</td>
                <td className="p-2">2000</td>
                <td className="p-2">2000</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TickerTable;

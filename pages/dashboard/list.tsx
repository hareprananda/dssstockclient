import React from "react";
import Icon from "src/assets/Icon";
import Button from "src/components/Element/Button.styled";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";

const List = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mt-20">Data Saham</h1>
      <div className="flex mt-5 items-center">
        <div
          style={{ backgroundColor: "#F8F8F8" }}
          className="relative px-3 py-2 flex flex-auto border-2 border-brown rounded-xl overflow-hidden items-center"
        >
          <Icon.Search fill="#9E9E9E" className="mr-2" />
          <input className="text-xl border-none focus:outline-none h-full flex-auto bg-transparent" />
          <Button
            padding="7px 20px"
            className="bg-primary absolute right-0 h-full uppercase font-bold text-white"
          >
            search
          </Button>
        </div>
        <p
          className="text-lg font-bold uppercase ml-3"
          style={{ color: "#9e9e9e" }}
        >
          sort by:
        </p>
        <select
          className="focus:outline-none ml-3 text-xl px-3 py-2 border-2 border-brown rounded-xl"
          style={{ backgroundColor: "#F8F8F8" }}
        >
          <option>Ticker</option>
          <option>Nama Perusahaan</option>
          <option>Harga</option>
          <option>PER</option>
          <option>PBV</option>
          <option>Current Ratio</option>
          <option>Market Cap</option>
        </select>
      </div>
      <table className="table-auto w-full mt-7">
        <thead>
          <tr className="bg-smoothPrimary text-primary text-left">
            <th className="bg-primary text-white p-2">Ticker</th>
            <th className="p-2">Nama Perusahaan</th>
            <th className="p-2">Harga</th>
            <th className="p-2">PER</th>
            <th className="p-2">PBV</th>
            <th className="p-2">Current Ratio</th>
            <th className="p-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-brown">
            <td className="p-2">PTBA</td>
            <td className="p-2">PT Bukit Asam tbk</td>
            <td className="p-2">858</td>
            <td className="p-2">12</td>
            <td className="p-2">2.6</td>
            <td className="p-2">50%</td>
            <td className="p-2">10T</td>
          </tr>
          <tr className="border-b-2 border-brown">
            <td className="p-2">PTBA</td>
            <td className="p-2">PT Bukit Asam tbk</td>
            <td className="p-2">858</td>
            <td className="p-2">12</td>
            <td className="p-2">2.6</td>
            <td className="p-2">50%</td>
            <td className="p-2">10T</td>
          </tr>
          <tr className="border-b-2 border-brown">
            <td className="p-2">PTBA</td>
            <td className="p-2">PT Bukit Asam tbk</td>
            <td className="p-2">858</td>
            <td className="p-2">12</td>
            <td className="p-2">2.6</td>
            <td className="p-2">50%</td>
            <td className="p-2">10T</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default withProtected(List);

import React, { useEffect, useRef, useState } from "react";
import Icon from "src/assets/Icon";
import Button from "src/components/Element/Button.styled";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import Link from "next/link";
import { RouteUrl } from "src/route/RouteUrl";
import useRequest from "src/hooks/useRequest";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import { ResponseConfigDssRawData } from "src/request/DSS/RequestDSSType";

const List = () => {
  const { RequestAuthenticated } = useRequest();
  const [dataList, setDataList] = useState<ResponseConfigDssRawData>([]);
  const fullDataListRef = useRef<ResponseConfigDssRawData>([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<
    [keyof ResponseConfigDssRawData[number], "asc" | "desc"]
  >(["_id", "asc"]);

  useEffect(() => {
    RequestAuthenticated<ResponseConfigDssRawData>(ConfigDSS.rawData())
      .then((res) => {
        fullDataListRef.current = res.data;
        const [orderByKey, order] = orderBy;
        fullDataListRef.current.sort((a, b) => {
          if (order === "asc") {
            if (typeof a[orderByKey] === "string") {
              return (a[orderByKey] as string).localeCompare(
                b[orderByKey] as string
              );
            } else {
              return (a[orderByKey] as number) - (b[orderByKey] as number);
            }
          } else {
            if (typeof a[orderByKey] === "string") {
              return (b[orderByKey] as string).localeCompare(
                a[orderByKey] as string
              );
            } else {
              return (b[orderByKey] as number) - (a[orderByKey] as number);
            }
          }
        });
        setDataList(fullDataListRef.current);
      })
      .catch(() => null);
  }, []);

  useEffect(() => {
    const regex = new RegExp(search.toLowerCase(), "g");
    const newData = fullDataListRef.current.filter(
      (data) =>
        data._id.toLowerCase().match(regex) ||
        data.nama.toLowerCase().match(regex)
    );
    setDataList(newData);
  }, [search]);

  const changeOrderBy = (key: keyof ResponseConfigDssRawData[number]) => () => {
    setOrderBy((current) => {
      const order = current[1];
      return [key, order === "asc" ? "desc" : "asc"];
    });
  };

  useEffect(() => {
    const [orderByKey, order] = orderBy;
    setDataList((current) => {
      const orderedData = [...current];

      orderedData.sort((a, b) => {
        if (order === "asc") {
          if (typeof a[orderByKey] === "string") {
            return (a[orderByKey] as string).localeCompare(
              b[orderByKey] as string
            );
          } else {
            return (a[orderByKey] as number) - (b[orderByKey] as number);
          }
        } else {
          if (typeof a[orderByKey] === "string") {
            return (b[orderByKey] as string).localeCompare(
              a[orderByKey] as string
            );
          } else {
            return (b[orderByKey] as number) - (a[orderByKey] as number);
          }
        }
      });
      return orderedData;
    });
  }, [orderBy]);

  const orderedByArrow = (key: keyof ResponseConfigDssRawData[number]) => {
    if (orderBy[0] === key) {
      return orderBy[1] === "asc" ? (
        <Icon.ArrowUp fill="white" />
      ) : (
        <Icon.ArrowDown fill="white" />
      );
    } else {
      return null;
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mt-20">Data Saham</h1>
      <div className="flex mt-5 items-center">
        <div
          style={{ backgroundColor: "#F8F8F8" }}
          className="relative px-3 py-2 flex flex-auto border-2 border-brown rounded-xl overflow-hidden items-center"
        >
          <Icon.Search fill="#9E9E9E" className="mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xl border-none focus:outline-none h-full flex-auto bg-transparent"
          />
          <Button
            padding="7px 20px"
            className="bg-primary absolute right-0 h-full uppercase font-bold text-white"
          >
            search
          </Button>
        </div>
      </div>
      <div className="max-w-full overflow-auto">
        <table className="table-auto w-full mt-7">
          <thead>
            <tr className="bg-smoothPrimary text-primary text-left">
              <th
                onClick={changeOrderBy("_id")}
                className={`${
                  orderBy[0] === "_id" && "bg-primary text-white"
                } p-2 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>Ticker</span>
                  {orderedByArrow("_id")}
                </div>
              </th>
              <th
                onClick={changeOrderBy("nama")}
                className={`${
                  orderBy[0] === "nama" && "bg-primary text-white"
                } p-2 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>Nama Perusahaan</span>
                  {orderedByArrow("nama")}
                </div>
              </th>
              <th
                onClick={changeOrderBy("harga")}
                className={`${
                  orderBy[0] === "harga" && "bg-primary text-white"
                } p-2 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>Harga</span>
                  {orderedByArrow("harga")}
                </div>
              </th>
              <th
                onClick={changeOrderBy("per")}
                className={`${
                  orderBy[0] === "per" && "bg-primary text-white"
                } p-2 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>PER</span>
                  {orderedByArrow("per")}
                </div>
              </th>
              <th
                onClick={changeOrderBy("pbv")}
                className={`${
                  orderBy[0] === "pbv" && "bg-primary text-white"
                } p-2 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>PBV</span>
                  {orderedByArrow("pbv")}
                </div>
              </th>
              <th
                onClick={changeOrderBy("currentRatio")}
                className={`${
                  orderBy[0] === "currentRatio" && "bg-primary text-white"
                } p-2 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>Current Ratio</span>
                  {orderedByArrow("currentRatio")}
                </div>
              </th>
              <th
                onClick={changeOrderBy("marketCap")}
                className={`${
                  orderBy[0] === "marketCap" && "bg-primary text-white"
                } p-2 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>Market Cap</span>
                  {orderedByArrow("marketCap")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data) => (
              <tr key={data._id} className="border-b-2 border-brown">
                <td className="p-2">
                  <Link href={`${RouteUrl.ticker}/${data._id}`}>
                    <a className="text-primary">{data._id}</a>
                  </Link>
                </td>
                <td className="p-2">
                  <Link href={`${RouteUrl.ticker}/${data._id}`}>
                    <a className="text-primary">{data.nama}</a>
                  </Link>
                </td>
                <td className="p-2">{data.harga}</td>
                <td className="p-2">{data.per.toFixed(2)}</td>
                <td className="p-2">{data.pbv.toFixed(2)}</td>
                <td className="p-2">{data.currentRatio.toFixed(2)}%</td>
                <td className="p-2">
                  {(data.marketCap / 1000000000000).toFixed(2)}T
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withProtected(List);

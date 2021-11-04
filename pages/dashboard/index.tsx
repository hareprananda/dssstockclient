import React, { useEffect, useRef, useState } from "react";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import { Page } from "src/types/Page";
import DateHelper from "src/utils/date/DateHelper";
import useRequest from "src/hooks/useRequest";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import { ResponseDssResult } from "src/request/DSS/RequestDSSType";
import CountDetail from "src/components/Page/Dashboard/CountDetail";
import { useAppDispatch, useAppSelector } from "src/redux/ReduxHook";
import ReducerActions from "src/redux/ReducerAction";

const Dashboard: Page = () => {
  const [currentDate, setCurrentDate] = useState("");
  const { RequestAuthenticated } = useRequest();
  const [resultData, setResultData] = useState<ResponseDssResult>([]);
  const [resultBoxLimit, setResultBoxLimit] = useState(0);
  const [showCountDetail, setShowCountDetail] = useState(false);
  const { requestCountDss } = useAppSelector((state) => state.request);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const fullResultData = useRef<ResponseDssResult>([]);
  useEffect(() => {
    dispatch(ReducerActions.ui.setMainLoader(true));
    RequestAuthenticated<ResponseDssResult>(ConfigDSS.result())
      .then((res) => {
        fullResultData.current = res.data;
        setResultData(res.data);
        setResultBoxLimit(10);
      })
      .catch(() => null)
      .finally(() => {
        dispatch(ReducerActions.ui.setMainLoader(false));
      });
  }, [requestCountDss]);

  useEffect(() => {
    const currentString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    const currentTime = new Date(currentString);
    setCurrentDate(
      currentTime.getDate() +
        " " +
        DateHelper.monthName(currentTime.getMonth()) +
        " " +
        currentTime.getFullYear()
    );
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const newData = fullResultData.current.filter(
      (result) =>
        result.nama.toLowerCase().includes(search.toLowerCase()) ||
        result.ticker.toLowerCase().includes(search.toLowerCase())
    );
    setResultData(newData);
  }, [search]);
  const resultBox: JSX.Element[] = [];
  for (let i = 0; i < resultBoxLimit; i++) {
    if (!resultData[i]) break;
    resultBox.push(
      <div
        key={i}
        className="bg-primary text-white relative rounded-2xl shadow-2xl overflow-hidden"
        style={{ paddingTop: "100%" }}
      >
        <div className="absolute top-0 w-full h-full">
          <div className="flex justify-between">
            <p className="text-2xl font-bold bg-brown px-5 py-3 rounded shadow-xl">
              #{i + 1}
            </p>
            <p className="text-2xl font-bold px-5 py-3">
              {resultData[i]?.nilai?.toFixed(4)}
            </p>
          </div>
          <div className="absolute centeringElement text-5xl font-bold">
            {resultData[i]?.ticker}
          </div>
          <div className="absolute bottom-2 px-5">{resultData[i]?.nama}</div>
        </div>
      </div>
    );
  }
  const numberOfDataOptionList = (
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  ) => {
    const optionList: JSX.Element[] = [];
    for (let i = 1; i <= resultData.length / 5; i++) {
      optionList.push(<option value={5 * i}>{5 * i}</option>);
    }
    return (
      <select
        value={resultBoxLimit}
        onChange={onChange}
        className="block appearance-none bg-primary bg-opacity-20 border font-bold border-gray-200 text-primary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {optionList}
      </select>
    );
  };
  const changeBoxResult = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResultBoxLimit(parseInt(e.target.value));
  };

  return (
    <>
      <div className="flex justify-between mt-28 ">
        <p className="text-3xl bg-darkPrimary text-white px-4 py-1 font-semibold rounded-md">
          Topsis value investing final ranking
        </p>
        <p className="text-3xl text-darkPrimary font-semibold">{currentDate}</p>
      </div>

      <div className="grid place-items-center mt-8">
        <input
          onChange={onChangeSearch}
          placeholder="Search..."
          className="focus:outline-none w-2/5 text-darkPrimary px-3 py-1 mx-auto bg-softPrimary2 border-primary border-2 rounded-xl text-2xl shadow-10xl"
        />
      </div>
      <div>
        <div className="flex items-center mt-10">
          <p className="block  text-primary   text-lg font-bold mr-3">
            Tampilkan :
          </p>
          {numberOfDataOptionList(changeBoxResult)}
        </div>
        <div className="grid grid-cols-6 gap-5 mt-8">{resultBox}</div>
      </div>
      {showCountDetail && (
        <CountDetail
          key={requestCountDss}
          numberOfDataOptionList={numberOfDataOptionList}
        />
      )}
      <button
        onClick={() => setShowCountDetail((current) => !current)}
        className="mt-10 py-1 w-full bg-primary text-white font-bold text-center"
      >
        {showCountDetail ? "Sembunyikan" : "Tampilkan"} detail perhitungan
      </button>
    </>
  );
};
export default withProtected(Dashboard);

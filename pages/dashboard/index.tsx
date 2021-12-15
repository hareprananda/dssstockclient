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
import { useWindowResize } from "src/hooks/useWindowResize";

const Dashboard: Page = () => {
  const [currentDate, setCurrentDate] = useState("");
  const { RequestAuthenticated } = useRequest();
  const [resultData, setResultData] = useState<ResponseDssResult>([]);
  const [resultBoxLimit, setResultBoxLimit] = useState(0);
  const [showCountDetail, setShowCountDetail] = useState(false);
  const { requestCountDss } = useAppSelector((state) => state.request);
  const [search, setSearch] = useState("");
  const { width } = useWindowResize();
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
      <div key={i} className="dashboard__result-box">
        <div>
          <div className="flex justify-between h-full md:h-auto">
            <p className="dashboard__result-rankNumber">
              <span className="hidden md:inline">#</span>
              {i + 1}
            </p>
            <p className=" dashboard__result-box__score">
              {resultData[i]?.nilai?.toFixed(4)}
            </p>
          </div>
          <div className="dashboard__result-box-ticker">
            {resultData[i]?.ticker}
          </div>
          <div className="dashboard__result-box-name">
            {width < 600
              ? resultData[i]?.nama.slice(0, 20)
              : resultData[i]?.nama}
          </div>
        </div>
      </div>
    );
  }
  const numberOfDataOptionList = (
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: number
  ) => {
    const optionList: JSX.Element[] = [];
    for (let i = 1; i <= resultData.length / 5; i++) {
      optionList.push(<option value={5 * i}>{5 * i}</option>);
    }
    return (
      <select
        value={value}
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
    <div className="dashboard__result">
      <div className="flex flex-col-reverse md:flex-row justify-between mt-28 ">
        <p className="text-xl sm:text-2xl md:text-3xl  md:bg-darkPrimary text-darkPrimary md:text-white md:px-4 py-1 font-bold md:font-semibold rounded-md">
          Value Investing Final Ranking
        </p>
        <p className="text-right mb-2 text-lg md:text-3xl text-darkPrimary md:font-semibold">
          {currentDate}
        </p>
      </div>

      <div className="grid place-items-center mt-8">
        <input
          onChange={onChangeSearch}
          placeholder="Search..."
          className="focus:outline-none placeholder-darkPrimary placeholder-opacity-60 w-full md:w-2/5 bg-primary bg-opacity-20 md:bg-opacity-100 text-darkPrimary px-3 py-1 mx-auto md:bg-softPrimary2 md:border-primary md:border-2 rounded-lg   md:text-2xl text-xl md:shadow-10xl"
        />
      </div>
      <div>
        <div className="flex items-center mt-10">
          <p className="block  text-primary   text-lg font-bold mr-3">
            Tampilkan :
          </p>
          {numberOfDataOptionList(changeBoxResult)}
        </div>
        <div className="dashboard__result-box__container">{resultBox}</div>
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
    </div>
  );
};
export default withProtected(Dashboard);

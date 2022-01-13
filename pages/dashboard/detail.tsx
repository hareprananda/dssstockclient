import React from "react";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import CountDetail from "src/components/Page/Dashboard/CountDetail";
import { useAppSelector } from "src/redux/ReduxHook";

const Detail = () => {
  const { requestCountDss } = useAppSelector((state) => state.request);
  const numberOfDataOptionList = (
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: number
  ) => {
    const optionList: JSX.Element[] = [];
    for (let i = 1; i <= 45 / 5; i++) {
      optionList.push(
        <option value={5 * i} key={i}>
          {5 * i}
        </option>
      );
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

  return (
    <>
      <p className="text-3xl mt-10 text-darkPrimary py-1 font-bold rounded-md">
        Detail Perhitungan
      </p>
      <CountDetail
        key={requestCountDss}
        showAll
        numberOfDataOptionList={numberOfDataOptionList}
      />
    </>
  );
};

export default withProtected(Detail);

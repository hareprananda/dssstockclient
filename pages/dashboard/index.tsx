import React, { ReactElement, useEffect, useState } from "react";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import { Page } from "src/types/Page";
import DateHelper from "src/utils/date/DateHelper";
import ResultData from "src/data/Result.json";

const Dashboard: Page = () => {
  const [currentDate, setCurrentDate] = useState("");
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
          placeholder="Search..."
          className="focus:outline-none w-2/5 text-darkPrimary px-3 py-1 mx-auto bg-softPrimary2 border-primary border-2 rounded-xl text-2xl shadow-10xl"
        />
      </div>
      <div className="grid grid-cols-6 gap-5 mt-8">
        {ResultData.map((data, index) => (
          <div
            className="bg-primary text-white relative rounded-2xl shadow-2xl overflow-hidden"
            style={{ paddingTop: "100%" }}
          >
            <div className="absolute top-0 w-full h-full">
              <div className="flex justify-between">
                <p className="text-2xl font-bold bg-brown px-5 py-3 rounded shadow-xl">
                  #{index + 1}
                </p>
                <p className="text-2xl font-bold px-5 py-3">{data.nilai}</p>
              </div>
              <div className="absolute centeringElement text-5xl font-bold">
                {data.ticker}
              </div>
              <div className="absolute bottom-2 px-5">{data.nama}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default withProtected(Dashboard);

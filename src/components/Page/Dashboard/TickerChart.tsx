import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData } from "src/types/Chart";
import ChartDefaultOptions from "src/utils/chart/ChartDefaultOptions";

const TickerChart = () => {
  const state: ChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Data",
        backgroundColor: "#0057B5",
        yAxisID: "A",
        borderWidth: 2,
        barThickness: 100,
        data: [65, 59, 80, 81, 56],
      },
      {
        type: "line",
        label: "Garis",
        yAxisID: "B",
        borderColor: "#00EC00",
        borderWidth: 3,
        fill: false,
        data: [165, 259, 840, 861, 516],
      },
    ],
  };

  return (
    <div>
      <div className="mt-6">
        <span className="bg-primary text-white py-2 text-3xl font-bold px-3 rounded ">
          Chart Laba dan Pertumbuhan Laba
        </span>
      </div>
      <Bar
        data={state}
        className="chart__laba__pertumbuhanLaba"
        options={ChartDefaultOptions}
      />

      <div className="mt-6">
        <span className="bg-primary text-white py-2 text-3xl font-bold px-3 rounded ">
          Chart Dividend
        </span>
      </div>

      <Bar
        data={state}
        className="chart__dividend"
        options={ChartDefaultOptions}
      />
    </div>
  );
};

export default TickerChart;

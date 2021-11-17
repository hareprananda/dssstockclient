import React, { useEffect } from "react";
import useChart from "src/hooks/useChart";
import { ResponseDssSingleStock } from "src/request/DSS/RequestDSSType";
import ChartDefaultOptions from "src/utils/chart/ChartDefaultOptions";
import { useWindowResize } from "src/hooks/useWindowResize";
import { Chart } from "chart.js";

interface Props {
  detailList: ResponseDssSingleStock["detail"];
}

const TickerChart: React.FC<Props> = ({ detailList }) => {
  const { width: windowWidth } = useWindowResize();
  const incomeChart = useChart("ticker__income-chart", {
    type: "bar",
    data: {
      labels: detailList.map((value) =>
        value.periode === 4
          ? value.tahun
          : `${value.tahun} kuartal ${value.periode}`
      ),
      datasets: [
        {
          type: "line",
          label: "Pertumbuhan laba",
          yAxisID: "B",
          borderColor: "#00EC00",
          backgroundColor: "transparent",
          borderWidth: 3,
          fill: false,
          data: detailList.map((value) => value.pertumbuhanLaba),
        },
        {
          label: "Laba bersih",
          backgroundColor: "#0057B5",
          yAxisID: "A",
          borderWidth: 2,
          barThickness: 100,
          data: detailList.map((value) => value.labaBersih),
        },
      ],
    },
    options: ChartDefaultOptions({ scales: "double" }),
  });

  const balanceChart = useChart("ticker__balance-chart", {
    type: "bar",
    data: {
      labels: detailList.map((value) =>
        value.periode === 4
          ? value.tahun
          : `${value.tahun} kuartal ${value.periode}`
      ),
      datasets: [
        {
          label: "Ekuitas",
          borderColor: "transparent",
          backgroundColor: "#0057B5",

          data: detailList.map((value) => value.ekuitas),
        },
        {
          label: "Aset Lancar",
          borderColor: "transparent",
          backgroundColor: "#00EC00",

          data: detailList.map((value) => value.asetLancar),
        },
        {
          label: "Utang Lancar",
          borderColor: "transparent",
          backgroundColor: "#f04832",

          data: detailList.map((value) => value.utangLancar),
        },
      ],
    },
    options: ChartDefaultOptions({ scales: "single" }),
  });

  useEffect(() => {
    if (!incomeChart) return;
    const pembulatan = detailList[detailList.length - 1].pembulatan;
    const pembulatanMultiply = Math.pow(10, pembulatan === 1 ? 0 : pembulatan);
    const leftSideTick = (value: string | number) => {
      const realValue = parseInt(value as string);
      const realValuePositif = realValue < 0 ? realValue * -1 : realValue;
      const trillionDivide = realValuePositif / Math.pow(10, 12);
      if (trillionDivide < 0.1) {
        return "Rp." + realValue / Math.pow(10, 9) + "M";
      }
      return "Rp." + realValue / Math.pow(10, 12) + "T";
    };
    incomeChart.data.labels = detailList.map((value) =>
      value.periode === 4
        ? value.tahun
        : `${value.tahun} kuartal ${value.periode}`
    );
    incomeChart.data.datasets[0].data = detailList.map(
      (value) => value.pertumbuhanLaba
    );
    incomeChart.data.datasets[1].data = detailList.map(
      (value) => value.labaBersih * pembulatanMultiply
    );
    if (
      incomeChart.options.scales &&
      incomeChart.options.scales["A"] &&
      incomeChart.options.scales["A"].ticks
    ) {
      incomeChart.options.scales["A"].ticks.callback = leftSideTick;
    }

    incomeChart.update();

    if (!balanceChart) return;
    balanceChart.data.labels = detailList.map((value) =>
      value.periode === 4
        ? value.tahun
        : `${value.tahun} kuartal ${value.periode}`
    );
    balanceChart.data.datasets[0].data = detailList.map(
      (value) => value.ekuitas * pembulatanMultiply
    );
    balanceChart.data.datasets[1].data = detailList.map(
      (value) => value.asetLancar * pembulatanMultiply
    );
    balanceChart.data.datasets[2].data = detailList.map(
      (value) => value.utangLancar * pembulatanMultiply
    );
    if (
      balanceChart.options.scales &&
      balanceChart.options.scales["A"] &&
      balanceChart.options.scales["A"].ticks
    ) {
      balanceChart.options.scales["A"].ticks.callback = leftSideTick;
    }
    balanceChart.update();
  }, [detailList]);
  useEffect(() => {
    if (windowWidth === 0 || !incomeChart) return;
    const chartElement = document.querySelector(
      "#incomeChart"
    ) as HTMLDivElement;
    const elementHeight = chartElement.offsetHeight;
    const divider = windowWidth > 500 ? 10 : windowWidth > 400 ? 12 : 17;
    (
      incomeChart as Chart<"bar", number[], unknown>
    ).data.datasets[1].barThickness = elementHeight / divider;
    incomeChart.update();
  }, [windowWidth]);

  return (
    <div>
      <div className="mt-6">
        <span className="sm:bg-primary text-primary sm:text-white py-2 text-xl sm:text-2xl md:text-3xl font-bold px-3 rounded ">
          Chart Laba dan Pertumbuhan Laba
        </span>
      </div>

      <div className="mx-auto full-chart" id="incomeChart">
        <canvas id="ticker__income-chart" className="mt-5" />
      </div>

      <div className="mt-6">
        <span className="sm:bg-primary text-primary sm:text-white py-2 text-xl sm:text-2xl md:text-3xl font-bold px-3 rounded ">
          Chart Posisi Keuangan
        </span>
      </div>

      <div className="mx-auto full-chart">
        <canvas id="ticker__balance-chart" className="mt-5" />
      </div>
    </div>
  );
};

export default TickerChart;

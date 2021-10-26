import React, { useEffect } from "react";
import useChart from "src/hooks/useChart";
import { ResponseDssSingleStock } from "src/request/DSS/RequestDSSType";
import ChartDefaultOptions from "src/utils/chart/ChartDefaultOptions";
import NumberUtils from "src/utils/number/NumberUtils";

interface Props {
  detailList: ResponseDssSingleStock["detail"];
}

const TickerChart: React.FC<Props> = ({ detailList }) => {
  const incomeChart = useChart("ticker__income-chart", {
    type: "bar",
    data: {
      labels: detailList.map((value) => value.tahun),
      datasets: [
        {
          label: "Laba bersih",
          backgroundColor: "#0057B5",
          yAxisID: "A",
          borderWidth: 2,
          barThickness: 100,
          data: detailList.map((value) => value.labaBersih),
        },
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
      ],
    },
    options: ChartDefaultOptions,
  });

  const balanceChart = useChart("ticker__balance-chart", {
    type: "bar",
    data: {
      labels: detailList.map((value) => value.tahun),
      datasets: [
        {
          label: "Ekuitas",
          borderColor: "transparent",
          backgroundColor: "#0057B5",
          yAxisID: "A",
          data: detailList.map((value) => value.ekuitas),
        },
        {
          label: "Aset Lancar",
          borderColor: "transparent",
          backgroundColor: "#00EC00",
          yAxisID: "A",
          data: detailList.map((value) => value.asetLancar),
        },
        {
          label: "Utang Lancar",
          borderColor: "transparent",
          backgroundColor: "#f04832",
          yAxisID: "A",
          data: detailList.map((value) => value.utangLancar),
        },
      ],
    },
    options: ChartDefaultOptions,
  });

  useEffect(() => {
    let pembagi = 1;
    if (detailList.length > 0) {
      const pembulatan = detailList[detailList.length - 1].pembulatan;
      if (pembulatan !== 1) pembagi = Math.pow(10, pembulatan);
    }

    if (!incomeChart) return;
    incomeChart.data.labels = detailList.map((value) => value.tahun);
    incomeChart.data.datasets[0].data = detailList.map(
      (value) => value.labaBersih
    );
    incomeChart.data.datasets[1].data = detailList.map(
      (value) => value.pertumbuhanLaba
    );
    incomeChart.update();

    if (!balanceChart) return;
    balanceChart.data.labels = detailList.map((value) => value.tahun);
    balanceChart.data.datasets[0].data = detailList.map(
      (value) => value.ekuitas / pembagi
    );
    balanceChart.data.datasets[1].data = detailList.map(
      (value) => value.asetLancar / pembagi
    );
    balanceChart.data.datasets[2].data = detailList.map(
      (value) => value.utangLancar / pembagi
    );
    balanceChart.update();
  }, [detailList]);

  return (
    <div>
      <div className="mt-6">
        <span className="bg-primary text-white py-2 text-3xl font-bold px-3 rounded ">
          Chart Laba dan Pertumbuhan Laba
        </span>
      </div>
      {detailList.length > 0 && (
        <p className="text-primary mt-10">
          * disajikan dalam{" "}
          {NumberUtils.pembulatan(detailList[detailList.length - 1].pembulatan)}
        </p>
      )}

      <canvas id="ticker__income-chart" className="mt-5" />

      <div className="mt-6">
        <span className="bg-primary text-white py-2 text-3xl font-bold px-3 rounded ">
          Chart Posisi Keuangan
        </span>
      </div>
      {detailList.length > 0 && (
        <p className="text-primary mt-10">
          * disajikan dalam{" "}
          {NumberUtils.pembulatan(detailList[detailList.length - 1].pembulatan)}
        </p>
      )}

      <canvas id="ticker__balance-chart" className="mt-5" />
    </div>
  );
};

export default TickerChart;

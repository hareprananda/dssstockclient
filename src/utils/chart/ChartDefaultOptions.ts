import type * as Chart from "chart.js";
const ChartDefaultOptions: Chart.ChartOptions = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    A: {
      type: "linear",
      display: true,
      position: "left",
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value) {
          return "Rp." + value;
        },
      },
    },
    B: {
      type: "linear",
      display: true,
      position: "right",
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value) {
          return value + "%";
        },
      },

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

export default ChartDefaultOptions;

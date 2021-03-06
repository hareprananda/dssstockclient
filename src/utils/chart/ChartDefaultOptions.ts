import type * as Chart from "chart.js";

interface Props {
  scales: "single" | "double";
}

const ChartDefaultOptions = (props: Props): Chart.ChartOptions => {
  let scales: Chart.ChartOptions["scales"] = {
    A: {
      type: "linear",
      display: true,
      position: "left",
    },
  };
  if (props.scales === "double") {
    scales = {
      ...scales,
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
    };
  }

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales,
  };
};

export default ChartDefaultOptions;

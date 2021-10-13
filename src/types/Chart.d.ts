import type * as Chart from "chart.js";

export type ChartData =
  | Chart.ChartData
  | ((canvas: HTMLCanvasElement) => Chart.ChartData);

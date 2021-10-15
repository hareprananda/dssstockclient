import React from "react";
import Icon from "src/assets/Icon";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";

const Upload = () => {
  const clickTooltip = () => {
    const tooltipEl = document.querySelector("#upload__tooltip");
    if (tooltipEl?.className.match(/hidden/g)) {
      tooltipEl?.classList.remove("hidden");
    } else {
      tooltipEl?.classList.add("hidden");
    }
  };

  return (
    <div className="mt-28">
      <div className="flex justify-between items-center relative">
        <h1 className="text-primary text-2xl font-bold">
          Upload Laporan Keuangan
        </h1>
        <div
          onClick={clickTooltip}
          className="grid place-items-center cursor-pointer text-white font-bold w-8 h-8 "
          style={{
            borderRadius: "50%",
            backgroundColor: "#9F9F9F",
          }}
        >
          ?
        </div>
        <div
          id="upload__tooltip"
          className="rounded text-white absolute top-14 p-3 text-justify hidden"
          style={{
            maxWidth: "200px",
            right: "-20px",
            backgroundColor: "#0052a1",
          }}
        >
          <span
            className="absolute"
            style={{
              borderBottom: "20px solid #0052a1",
              borderLeft: "15px solid transparent",
              borderRight: "15px solid transparent",
              borderTop: "0",
              top: "-18px",
              right: "20px",
            }}
          ></span>
          File yang diupload haruslah laporan keuangan yang dipublikasikan oleh
          Bursa Efek Indonesia berformat .xlsx
        </div>
      </div>
      <div
        className="grid mt-9 place-items-center pt-40 pb-20"
        style={{ minHeight: "100px", backgroundColor: "#C5E3FF" }}
      >
        <div>
          <Icon.CloudUploadIcon width="330px" height="225px" />
          <p className="text-center text-primary text-3xl pt-8">
            Drag and Drop .xlsx file
          </p>
        </div>
      </div>
    </div>
  );
};

export default withProtected(Upload);

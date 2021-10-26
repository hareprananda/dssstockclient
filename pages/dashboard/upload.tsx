import React, { useEffect, useRef, useState } from "react";
import Icon from "src/assets/Icon";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import Loader from "src/components/Loader/Loader";
import StatusModal from "src/components/Modal/StatusModal/StatusModal";
import useRequest from "src/hooks/useRequest";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import { TScreeningResult } from "src/types/File";
import ReadExcel from "src/utils/excel/ReadExcel";

const dragAndDropText = {
  onDrag: "Relase upload file",
  onDragLeave: "Drag & drop to upload file",
};

const Upload = () => {
  const [readyToUpload, setReadyToUpload] = useState(false);
  const screeningData = useRef<TScreeningResult>();
  const [uploadStatus, setUploadStatus] = useState<"success" | "error">(
    "success"
  );
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { RequestAuthenticated } = useRequest();
  const clickTooltip = () => {
    const tooltipEl = document.querySelector("#upload__tooltip");
    if (tooltipEl?.className.match(/hidden/g)) {
      tooltipEl?.classList.remove("hidden");
    } else {
      tooltipEl?.classList.add("hidden");
    }
  };

  const cleanFile = () => {
    const masterInput = document.querySelector(
      "#masterInput"
    ) as HTMLInputElement;
    masterInput.value = "";
  };

  useEffect(() => {
    if (uploadStatus) cleanFile();
  }, [uploadStatus]);
  const clickInput = () => {
    const inputElement = document.querySelector(
      "#masterInput"
    ) as HTMLInputElement;
    inputElement.click();
  };

  useEffect(() => {
    if (readyToUpload) {
      const data = screeningData.current as TScreeningResult;
      const descriptionEl = document.querySelector(
        "#upload__uploaded-file__description"
      ) as HTMLParagraphElement;
      descriptionEl.textContent = `Laporan keuangan ${data.general.ticker} periode ${data.general.periode} ${data.general.tahun}`;
    }
  }, [readyToUpload, loading]);
  const uploadedFile = useRef<File | null>(null);

  const readFile = async () => {
    const excelRead = ReadExcel({ path: uploadedFile.current as File });
    // const descriptionEl = document.querySelector(
    //   "#upload__uploaded-file__description"
    // ) as HTMLParagraphElement;
    //descriptionEl.textContent = `Laporan keuangan ${data.general.ticker} periode ${data.general.periode} ${data.general.tahun}`;

    try {
      const data = await excelRead.getData();
      screeningData.current = data;

      setReadyToUpload(true);
    } catch (_) {
      toggleModal();
      setModalMessage("File yang anda upload salah");
    }
  };

  useEffect(() => {
    const dropArea = document.querySelector("#upload_area") as HTMLDivElement;
    const dropAreaAdditionalClass = [
      "border-dashed",
      "border-4",
      "border-primary",
    ];
    const textElement = document.querySelector(
      "#upload__description"
    ) as HTMLParagraphElement;
    const eventListener = (
      event: "addEventListener" | "removeEventListener"
    ) => {
      dropArea[event]("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add(...dropAreaAdditionalClass);
        textElement.textContent = dragAndDropText.onDrag;
      });

      dropArea[event]("dragleave", () => {
        dropArea.classList.remove(...dropAreaAdditionalClass);
        textElement.textContent = dragAndDropText.onDragLeave;
      });

      dropArea[event]("drop", async (e) => {
        const evt = e as DragEvent;
        evt.preventDefault();
        uploadedFile.current = evt.dataTransfer?.files[0] as File;
        await readFile();
      });
    };

    eventListener("addEventListener");
    return () => eventListener("removeEventListener");
  }, []);

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = e.target.files?.[0];
    uploadedFile.current = files as File;
    if (files) {
      try {
        await readFile();
      } catch (err) {}
    }
    setLoading(false);
  };

  const uploadFile = () => {
    setLoading(true);
    RequestAuthenticated(
      ConfigDSS.newFinancial(screeningData.current as TScreeningResult)
    )
      .then((res) => {
        console.log(res);
        setOpenModal(true);
        setUploadStatus("success");
        const data = screeningData.current as TScreeningResult;
        setModalMessage(
          `Laporan keuangan ${data.general.ticker} periode ${data.general.periode} ${data.general.tahun} berhasil dikirim ke server`
        );
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setOpenModal(true);
          setModalMessage(err.response.data.error);
        }
        setUploadStatus("error");
      })
      .finally(() => {
        setLoading(false);
        setReadyToUpload(false);
        cleanFile();
      });
  };

  const toggleModal = () => {
    setOpenModal((current) => !current);
  };
  return (
    <div className="mt-28">
      <StatusModal
        title={uploadStatus === "error" ? "Oops" : "Sukses"}
        type={uploadStatus}
        text={modalMessage}
        open={openModal}
        toggleModal={toggleModal}
      />
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
        className="grid mt-9 rounded place-items-center pt-40 pb-20"
        id="upload_area"
        style={{ minHeight: "100px", backgroundColor: "#C5E3FF" }}
      >
        <div className="flex flex-col items-center">
          <Icon.CloudUploadIcon
            width="330px"
            height="225px"
            onClick={clickInput}
            className="hover:opacity-60 cursor-pointer"
          />
          <input
            type="file"
            accept=".xlsx"
            onChange={onChangeInput}
            className="hidden"
            id="masterInput"
          />

          {readyToUpload ? (
            <>
              <button
                disabled={loading}
                className={`bg-primary mt-5 hover:bg-opacity-40 text-2xl text-white rounded px-4 py-1 text-center disabled:opacity-50`}
                onClick={uploadFile}
              >
                Upload
              </button>
              <p
                className="mt-2 text-xl"
                id="upload__uploaded-file__description"
              ></p>
            </>
          ) : (
            <p
              className="text-center text-primary text-3xl pt-8"
              id="upload__description"
            >
              {dragAndDropText.onDragLeave}
            </p>
          )}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default withProtected(Upload);

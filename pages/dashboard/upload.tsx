import React, { useEffect, useRef, useState } from "react";
import Icon from "src/assets/Icon";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import Loader from "src/components/Loader/Loader";
import StatusModal from "src/components/Modal/StatusModal/StatusModal";
import NewCompanyModal from "src/components/Modal/NewCompanyModal/NewCompanyModal";
import useRequest from "src/hooks/useRequest";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import ReadExcel from "src/utils/excel/ReadExcel";
import { DssNewFinancialBody } from "src/request/DSS/RequestDSSType";
import { AxiosError } from "axios";

const dragAndDropText = {
  onDrag: "Relase upload file",
  onDragLeave: "Drag & drop to upload file",
};

const Upload = () => {
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [screeningData, setScreeningData] = useState<DssNewFinancialBody>([]);
  const [uploadStatus, setUploadStatus] = useState<"success" | "error">(
    "success"
  );
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openNewCompanyModal, setOpenNewCompanyModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [onClickStatusModal, setOnClickStatusModal] = useState<
    undefined | (() => void)
  >();

  //state for new company that need to upload price and number of shares
  const [additionalData, setAdditionalData] = useState<
    {
      harga: number;
      jumlahSaham: number;
      newCompanyTicker: string;
      newCompanyName: string;
    }[]
  >([]);
  const [activeAdditionalDataIndex, setActiveAdditionalDataIndex] = useState<
    number | undefined
  >();
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

  // useEffect(() => {
  //   if (readyToUpload) {
  //     const data = screeningData.current as TScreeningResult;
  //     const descriptionEl = document.querySelector(
  //       "#upload__uploaded-file__description"
  //     ) as HTMLParagraphElement;
  //     descriptionEl.textContent = `Laporan keuangan ${data.general.ticker} periode ${data.general.periode} ${data.general.tahun}`;
  //   }
  // }, [readyToUpload, loading]);
  const fileToRead = useRef<File | null>(null);
  const allUploadedFile = useRef<File[]>([]);
  const readFile = async () => {
    const excelRead = ReadExcel({ path: fileToRead.current as File });
    // const descriptionEl = document.querySelector(
    //   "#upload__uploaded-file__description"
    // ) as HTMLParagraphElement;
    //descriptionEl.textContent = `Laporan keuangan ${data.general.ticker} periode ${data.general.periode} ${data.general.tahun}`;

    try {
      const data = await excelRead.getData();
      setScreeningData((current) => {
        const isUnique = !current.find(
          (cv) =>
            cv.general.ticker === data.general.ticker &&
            cv.general.periode === data.general.periode &&
            cv.general.tahun === data.general.tahun
        );
        if (isUnique) {
          return [
            ...current,
            {
              dividen: data.dividen !== 0,
              ekuitas: data.balance["Jumlah ekuitas"],
              lababersih: data.income["Jumlah laba (rugi)"],
              general: data.general,
              utanglancar: data.balance["Jumlah liabilitas jangka pendek"],
              asetlancar: data.balance["Jumlah aset lancar"],
            },
          ];
        } else return current;
      });
    } catch (_) {
      setOpenStatusModal(true);
      setUploadStatus("error");
      setModalMessage("File yang anda upload salah");
    }
  };

  const recursiveReadFile = async (index = 0): Promise<any> => {
    const fileLength = allUploadedFile.current.length;
    setLoading(true);
    const files = allUploadedFile.current[index];
    fileToRead.current = files as File;
    if (files) {
      try {
        await readFile();
      } catch (err) {}
    }
    if (index < fileLength - 1) return recursiveReadFile(index + 1);
    else {
      setLoading(false);
      setReadyToUpload(true);
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
        dropArea.classList.remove(...dropAreaAdditionalClass);
        allUploadedFile.current = [
          ...allUploadedFile.current,
          ...(evt.dataTransfer?.files as unknown as File[]),
        ];
        recursiveReadFile();
      });
    };

    eventListener("addEventListener");
    return () => eventListener("removeEventListener");
  }, []);

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    allUploadedFile.current = [
      ...allUploadedFile.current,
      ...(e.target.files as unknown as File[]),
    ];
    recursiveReadFile();
  };

  const finishRequest = () => {
    setLoading(false);
    setReadyToUpload(false);
    cleanFile();
  };

  const processErrorMessage = (
    messages: string[],
    from: "error" | "success"
  ) => {
    additionalDataRefLength.current = 0;
    const errorMessage = messages
      .reduce((acc, v) => {
        if (/amount of stock/g.test(v)) {
          additionalDataRefLength.current += 1;
          const newTicker = v.slice(v.length - 4);
          const findNewData = screeningData.find(
            (v) => v.general.ticker.toLowerCase() === newTicker.toLowerCase()
          ) as typeof screeningData[number];
          const { nama: newCompanyName, ticker: newCompanyTicker } =
            findNewData.general;
          setAdditionalData((current) => [
            ...current,
            {
              newCompanyName,
              newCompanyTicker,
              harga: 0,
              jumlahSaham: 0,
            },
          ]);
        }
        return `${acc}, ${v}`;
      }, "")
      .slice(2);
    if (additionalDataRefLength.current === 0) setScreeningData([]);
    if (from === "success")
      setOnClickStatusModal(() => () => switchModalToError(errorMessage));
    else {
      setModalMessage(errorMessage);
      setUploadStatus("error");
      setOnClickStatusModal(() => {
        if (additionalDataRefLength.current > 0)
          return () => {
            toggleNewCompanyModal();
            setActiveAdditionalDataIndex(0);
          };
        return undefined;
      });
    }
  };

  const additionalDataRefLength = useRef(0);
  const uploadFile = () => {
    setLoading(true);
    setOnClickStatusModal(undefined);
    for (const additional of additionalData) {
      const screeningDataIndex = screeningData.findIndex(
        (data) => data.general.ticker === additional.newCompanyTicker
      );
      screeningData[screeningDataIndex].harga = additional.harga;
      screeningData[screeningDataIndex].jumlahSaham = additional.jumlahSaham;
    }
    RequestAuthenticated(ConfigDSS.newFinancial(screeningData))
      .then(() => {
        setOpenStatusModal(true);
        setUploadStatus("success");
        const modalText =
          screeningData
            .reduce((acc, v) => {
              acc += `, ${v.general.ticker} periode ${v.general.periode} ${v.general.tahun}`;
              return acc;
            }, "")
            .slice(2) + " berhasil dikirim ke server";
        setModalMessage(modalText);
        setAdditionalData((current) => ({
          ...current,
          harga: 0,
          jumlahSaham: 0,
        }));
        setScreeningData([]);
        finishRequest();
      })
      .catch(
        (
          err: AxiosError<{
            error: { message: string[] };
            success: { message: string[] };
          }>
        ) => {
          if (!err.response) throw err;

          if (err.response.status === 400) {
            const { error, success } = err.response.data;
            if (success.message.length > 0) {
              const modalMessage = success.message
                .reduce((acc, v) => `${acc}, ${v}`, "")
                .slice(2);
              setModalMessage(modalMessage);
              setUploadStatus("success");
              if (error.message) {
                processErrorMessage(error.message, "success");
              }
            } else {
              processErrorMessage(error.message, "error");
            }
            toggleStatusModal();
            finishRequest();
            //buat modal untuk menampilkan sukses terlebih dahulu

            // const errorMessage = err.response.data.error;
            // if (/amount of stock/g.test(errorMessage)) {
            //   // setAdditionalData((current) => ({
            //   //   ...current,
            //   //   newCompanyName: screeningData.current?.general.nama as string,
            //   //   newCompanyTicker: screeningData.current?.general.ticker as string,
            //   // }));
            //   // setLoading(false);
            //   // toggleNewCompanyModal();
            // } else {
            //   setOpenStatusModal(true);
            //   setModalMessage(errorMessage);
            //   finishRequest();
            // }
          }
          //setUploadStatus("error");
        }
      );
  };

  const switchModalToError = (errMessage: string) => {
    setOnClickStatusModal(() => {
      if (additionalDataRefLength.current > 0)
        return () => {
          toggleNewCompanyModal();
          setActiveAdditionalDataIndex(0);
        };
      return undefined;
    });
    setUploadStatus("error");
    setModalMessage(errMessage);
  };

  const toggleStatusModal = () => {
    setOpenStatusModal((current) => !current);
  };

  const toggleNewCompanyModal = () => {
    setOpenNewCompanyModal((current) => !current);
  };

  const onCancelAddSharePrice = () => {
    finishRequest();
    toggleNewCompanyModal();
  };
  const onSubmitAddSharePrice = (data: {
    harga: string;
    jumlahSaham: string;
  }) => {
    const { harga, jumlahSaham } = data;
    setActiveAdditionalDataIndex((current) =>
      current !== undefined ? ++current : current
    );
    setAdditionalData((current) => {
      current[activeAdditionalDataIndex as number].harga = parseInt(harga);
      current[activeAdditionalDataIndex as number].jumlahSaham =
        parseInt(jumlahSaham);
      return [...current];
    });
  };

  useEffect(() => {
    if (
      activeAdditionalDataIndex === additionalData.length &&
      additionalData.length > 0
    ) {
      uploadFile();
      toggleNewCompanyModal();
      toggleStatusModal();
      setActiveAdditionalDataIndex(0);
    }
  }, [additionalData]);

  return (
    <div className="mt-28">
      <StatusModal
        title={uploadStatus === "error" ? "Oops" : "Sukses"}
        type={uploadStatus}
        text={modalMessage}
        open={openStatusModal}
        onClickButton={onClickStatusModal}
        toggleModal={toggleStatusModal}
      />
      <NewCompanyModal
        onCancel={onCancelAddSharePrice}
        onSubmit={onSubmitAddSharePrice}
        toggle={toggleNewCompanyModal}
        open={openNewCompanyModal}
        data={{
          nama: additionalData[activeAdditionalDataIndex as number]
            ?.newCompanyName,
          ticker:
            additionalData[activeAdditionalDataIndex as number]
              ?.newCompanyTicker,
          // nama: "MALONE",
          // ticker: "MBAP",
        }}
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
            multiple
            onChange={onChangeInput}
            className="hidden"
            id="masterInput"
          />
          {readyToUpload && (
            <p className="text-lg">
              {screeningData.length} Data Laporan Keuangan
            </p>
          )}
          <div
            className="grid grid-cols-4 gap-2 mt-5 hide-scrollbar"
            style={{ maxHeight: "150px", overflow: "auto" }}
          >
            {screeningData.map((result, key) => (
              <div key={key} className="flex flex-col items-center">
                <Icon.Excel
                  className="text-primary"
                  style={{ width: "50px", height: "50px" }}
                />
                <p className="text-center">
                  {result.general.ticker} periode {result.general.periode}{" "}
                  {result.general.tahun}
                </p>
              </div>
            ))}
          </div>

          {readyToUpload && (
            <>
              <button
                disabled={loading}
                className={`bg-primary mt-5 hover:bg-opacity-40 text-2xl text-white rounded px-4 py-1 text-center disabled:opacity-50`}
                onClick={uploadFile}
              >
                Upload
              </button>
            </>
          )}
          {!loading && !readyToUpload && (
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

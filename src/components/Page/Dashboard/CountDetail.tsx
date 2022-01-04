import React, { useEffect, useState } from "react";
import BobotModal from "src/components/Modal/BobotModal/BobotModal";
import useRequest from "src/hooks/useRequest";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import {
  RawData,
  ResponseConfigDssDetailCount,
  ResponseConfigDssRawData,
  ResponseDssCriteria,
} from "src/request/DSS/RequestDSSType";
import LocalStorage from "src/utils/localstorage/LocalStorage";

interface Props {
  numberOfDataOptionList: (
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: number
  ) => JSX.Element;
}

const criteriaTableList = [
  "Ticker",
  "Ukuran Perusahaan",
  "Kondisi Keuangan",
  "Stabilitas Laba",
  "Catatan Dividen",
  "Pertumbuhan Laba",
  "PER",
  "PBV",
];

const generalTableHeader = (
  <tr className="border-t-2 border-b-2 border-gray-300">
    {criteriaTableList.map((data) => (
      <td
        key={data}
        className={`font-bold text-primary p-2 ${
          data === "Ticker" && "bg-primary bg-opacity-20"
        }`}
      >
        {data}
      </td>
    ))}
  </tr>
);

const CountDetail: React.FC<Props> = ({ numberOfDataOptionList }) => {
  const { RequestAuthenticated } = useRequest();
  const [criteriaList, setCriteriaList] = useState<ResponseDssCriteria>([]);
  const [numberOfRawData, setNumberOfRawData] = useState(0);
  const [rawData, setRawData] = useState<ResponseConfigDssRawData>([]);

  const [normalizationData, setNormalizationData] = useState<RawData[]>([]);
  const [numberOfNormalizationData, setNumberOfNormalizationData] = useState(0);

  const [weightNormalizationData, setWeightNormalizationData] = useState<
    RawData[]
  >([]);
  const [numberOfWeightNormalizationData, setNumberOfWeightNormalizationData] =
    useState(0);

  const [idealSolutionData, setIdealSolutionData] = useState<{
    positif: Omit<RawData, "nama" | "_id">;
    negatif: Omit<RawData, "nama" | "_id">;
  }>();

  const [idealSolutionDistance, setIdealSolutionDistance] = useState<
    Record<string, { dPlus: number; dMin: number; nama: string }>
  >({});
  const [numberOfIdealSolutionDistance, setNumberOfIdealSolutionDistance] =
    useState(0);

  const [finalRankingData, setFinalRankingData] = useState<
    {
      ticker: string;
      nilai: number;
      nama: string;
    }[]
  >([]);
  const [numberOfFinalRankingData, setNumberOfFinalRankingData] = useState(0);
  const [openCriteriaModal, setOpenCriteriaModal] = useState(false);
  useEffect(() => {
    RequestAuthenticated(ConfigDSS.criteria()).then((res) => {
      setCriteriaList(res.data);
    });

    RequestAuthenticated<ResponseConfigDssRawData>(ConfigDSS.rawData())
      .then((res) => {
        setRawData(res.data);
        setNumberOfRawData(10);
      })
      .catch(() => null);

    RequestAuthenticated<ResponseConfigDssDetailCount>(ConfigDSS.detailCount())
      .then((res) => {
        const {
          finalRanking,
          idealSolution,
          idealSolutionDistance,
          normalization,
          normalizationWeight,
        } = res.data;

        setNormalizationData(normalization);
        setNumberOfNormalizationData(10);

        setWeightNormalizationData(normalizationWeight);
        setNumberOfWeightNormalizationData(10);

        setIdealSolutionData(idealSolution);

        setIdealSolutionDistance(idealSolutionDistance);
        setNumberOfIdealSolutionDistance(10);

        setFinalRankingData(finalRanking);
        setNumberOfFinalRankingData(10);
      })
      .catch(() => null);
  }, []);

  const changeRawDataResult = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfRawData(parseInt(e.target.value));
  };

  const changeNormalizationDataResult = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumberOfNormalizationData(parseInt(e.target.value));
  };

  const changeWeightNormalizationDataResult = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumberOfWeightNormalizationData(parseInt(e.target.value));
  };

  const changeIdealSolutionDistance = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumberOfIdealSolutionDistance(parseInt(e.target.value));
  };

  const changeFinalRanking = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfFinalRankingData(parseInt(e.target.value));
  };

  const rawDataListComponent: JSX.Element[] = [];
  for (let i = 0; i < numberOfRawData; i++) {
    rawDataListComponent.push(
      <tr key={i} className="border-b-2 border-gray-300">
        <td className="p-2 bg-primary bg-opacity-20 font text-primary">
          {rawData[i]._id}
        </td>
        <td className="p-2 text-primary">{rawData[i].marketCap}</td>
        <td className="p-2 text-primary">{rawData[i].currentRatio}</td>
        <td className="p-2 text-primary">{rawData[i].adanyaLaba}</td>
        <td className="p-2 text-primary">{rawData[i].adanyaDividen}</td>
        <td className="p-2 text-primary">{rawData[i].pertumbuhanLaba}</td>
        <td className="p-2 text-primary">{rawData[i].per}</td>
        <td className="p-2 text-primary">{rawData[i].pbv}</td>
      </tr>
    );
  }

  const normalizationDataListComponent: JSX.Element[] = [];
  for (let i = 0; i < numberOfNormalizationData; i++) {
    normalizationDataListComponent.push(
      <tr key={i} className="border-b-2 border-gray-300">
        <td className="p-2 bg-primary bg-opacity-20 font text-primary">
          {normalizationData[i]._id}
        </td>
        <td className="p-2 text-primary">
          {normalizationData[i].marketCap.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {normalizationData[i].currentRatio.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {normalizationData[i].adanyaLaba.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {normalizationData[i].adanyaDividen.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {normalizationData[i].pertumbuhanLaba.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {normalizationData[i].per.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {normalizationData[i].pbv.toFixed(4)}
        </td>
      </tr>
    );
  }

  const weightNormalizationListComponent: JSX.Element[] = [];
  for (let i = 0; i < numberOfWeightNormalizationData; i++) {
    weightNormalizationListComponent.push(
      <tr key={i} className="border-b-2 border-gray-300">
        <td className="p-2 bg-primary bg-opacity-20 font text-primary">
          {weightNormalizationData[i]._id}
        </td>
        <td className="p-2 text-primary">
          {weightNormalizationData[i].marketCap.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {weightNormalizationData[i].currentRatio.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {weightNormalizationData[i].adanyaLaba.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {weightNormalizationData[i].adanyaDividen.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {weightNormalizationData[i].pertumbuhanLaba.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {weightNormalizationData[i].per.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {weightNormalizationData[i].pbv.toFixed(4)}
        </td>
      </tr>
    );
  }

  const idealSolutionDistanceComponent: JSX.Element[] = [];
  const idealSolutionDistanceKey = Object.keys(idealSolutionDistance);
  for (let i = 0; i < numberOfIdealSolutionDistance; i++) {
    idealSolutionDistanceComponent.push(
      <tr key={i} className="border-b-2 border-gray-300">
        <td className="p-2 bg-primary bg-opacity-20 font text-primary">
          {idealSolutionDistanceKey[i]}
        </td>
        <td className="p-2 text-primary">
          {idealSolutionDistance[idealSolutionDistanceKey[i]].dPlus.toFixed(4)}
        </td>
        <td className="p-2 text-primary">
          {idealSolutionDistance[idealSolutionDistanceKey[i]].dMin.toFixed(4)}
        </td>
      </tr>
    );
  }

  const finalRankingComponent: JSX.Element[] = [];
  for (let i = 0; i < numberOfFinalRankingData; i++) {
    finalRankingComponent.push(
      <tr key={i} className="border-b-2 border-gray-300">
        <td className="p-2 bg-primary bg-opacity-20 font-bold text-primary">
          {finalRankingData[i].ticker}
        </td>
        <td className="p-2 text-primary">
          {finalRankingData[i].nilai.toFixed(4)}
        </td>
        <td className="p-2 text-primary">{i + 1}</td>
      </tr>
    );
  }
  const toggleBobotModal = () => {
    setOpenCriteriaModal((current) => !current);
  };
  const userData = LocalStorage.get("user_data");

  return (
    <div className="mt-10">
      <BobotModal
        open={openCriteriaModal}
        setOpen={setOpenCriteriaModal}
        currentCriteria={criteriaList}
      />
      <div>
        <span className="text-xl sm:text-2xl md:text-3xl text-darkPrimary font-bold  sm:bg-darkPrimary sm:text-white sm:px-4 py-1 sm:font-semibold rounded-md">
          1. Bobot
        </span>
        <div className="w-full overflow-auto">
          <table className="w-full mt-10">
            <thead>
              <tr className="border-t-2 border-b-2 border-gray-300">
                <td className="p-2"></td>
                {criteriaList.map((value) => (
                  <td
                    key={value._id}
                    className="text-primary p-2 font-bold text-center"
                  >
                    {value.nama}
                  </td>
                ))}
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="p-2"></td>
                {criteriaList.map((value) => (
                  <td
                    key={value._id}
                    className="text-primary p-2 font-bold text-center "
                  >
                    {value.bobot}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-gray-300">
                <td className="p-2 bg-primary bg-opacity-20 font text-primary font-bold">
                  Keterangan
                </td>
                {criteriaList.map((value) => (
                  <td key={value._id} className="text-primary text-center ">
                    {value.keterangan.slice(0, 1).toUpperCase() +
                      value.keterangan.slice(1)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {userData?.level === "admin" ? (
          <div className="flex flex-row-reverse">
            <button
              onClick={toggleBobotModal}
              className="bg-primary text-white px-5 py-2 text-lg rounded font-bold mt-5"
            >
              Update Bobot
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-10">
        <span className="text-xl sm:text-2xl md:text-3xl text-darkPrimary font-bold  sm:bg-darkPrimary sm:text-white sm:px-4 py-1 sm:font-semibold rounded-md">
          2. Data
        </span>
        <div className="flex items-center mt-10">
          <p className="block  text-primary   text-lg font-bold mr-3">
            Tampilkan :
          </p>
          {numberOfDataOptionList(changeRawDataResult, numberOfRawData)}
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full mt-10">
            <thead>{generalTableHeader}</thead>
            <tbody>{rawDataListComponent}</tbody>
          </table>
        </div>
      </div>
      <div className="mt-10">
        <span className="text-xl sm:text-2xl md:text-3xl text-darkPrimary font-bold  sm:bg-darkPrimary sm:text-white sm:px-4 py-1 sm:font-semibold rounded-md">
          3. Matriks keputusan ternormalisasi
        </span>
        <div className="flex items-center mt-10">
          <p className="block  text-primary   text-lg font-bold mr-3">
            Tampilkan :
          </p>
          {numberOfDataOptionList(
            changeNormalizationDataResult,
            numberOfNormalizationData
          )}
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full mt-10">
            <thead>{generalTableHeader}</thead>
            <tbody>{normalizationDataListComponent}</tbody>
          </table>
        </div>
      </div>
      <div className="mt-10">
        <span className="text-xl sm:text-2xl md:text-3xl text-darkPrimary font-bold  sm:bg-darkPrimary sm:text-white sm:px-4 py-1 sm:font-semibold rounded-md">
          4. Matriks keputusan ternormalisasi terbobot
        </span>
        <div className="flex items-center mt-10">
          <p className="block  text-primary   text-lg font-bold mr-3">
            Tampilkan :
          </p>
          {numberOfDataOptionList(
            changeWeightNormalizationDataResult,
            numberOfWeightNormalizationData
          )}
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full mt-10">
            <thead>{generalTableHeader}</thead>
            <tbody>{weightNormalizationListComponent}</tbody>
          </table>
        </div>
      </div>
      <div className="mt-10">
        <span className="text-xl sm:text-2xl md:text-3xl text-darkPrimary font-bold  sm:bg-darkPrimary sm:text-white sm:px-4 py-1 sm:font-semibold rounded-md">
          5. Matriks solusi ideal negatif dan positif
        </span>
        <div className="w-full overflow-auto">
          <table className="w-full mt-10">
            <thead>
              <tr className="border-t-2 border-b-2 border-gray-300">
                <td></td>
                {[
                  "Ukuran Perusahaan",
                  "Kondisi Keuangan",
                  "Stabilitas Laba",
                  "Catatan Dividen",
                  "Pertumbuhan Laba",
                  "PER",
                  "PBV",
                ].map((value) => (
                  <td className="p-2 font-bold text-primary " key={value}>
                    {value}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-gray-300">
                <td className="p-2 font-bold text-primary ">MAX</td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.positif.marketCap?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.positif.currentRatio?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.positif.adanyaLaba?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.positif.adanyaDividen?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.positif.pertumbuhanLaba?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.positif.per?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.positif.pbv?.toFixed(3)}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="p-2 font-bold text-primary ">MIN</td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.negatif.marketCap?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.negatif.currentRatio?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.negatif.adanyaLaba?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.negatif.adanyaDividen?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {idealSolutionData?.negatif.pertumbuhanLaba?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {(idealSolutionData?.negatif.per as number)?.toFixed(3)}
                </td>
                <td className="p-2 text-primary">
                  {(idealSolutionData?.negatif.pbv as number)?.toFixed(3)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10">
        <span className="text-xl sm:text-2xl md:text-3xl text-darkPrimary font-bold  sm:bg-darkPrimary sm:text-white sm:px-4 py-1 sm:font-semibold rounded-md">
          6. D+ dan D- untuk setiap alternatif
        </span>
        <div className="flex items-center mt-10">
          <p className="block  text-primary   text-lg font-bold mr-3">
            Tampilkan :
          </p>
          {numberOfDataOptionList(
            changeIdealSolutionDistance,
            numberOfIdealSolutionDistance
          )}
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full mt-10">
            <thead>
              <tr className="border-t-2 border-b-2 border-gray-300">
                <td className="p-2 font-bold text-primary bg-primary bg-opacity-20 ">
                  Ticker
                </td>
                <td className="p-2 font-bold text-primary ">D +</td>
                <td className="p-2 font-bold text-primary ">D -</td>
              </tr>
            </thead>
            <tbody>{idealSolutionDistanceComponent}</tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <span className="text-xl sm:text-2xl md:text-3xl text-darkPrimary font-bold  sm:bg-darkPrimary sm:text-white sm:px-4 py-1 sm:font-semibold rounded-md">
          7.Final Ranking
        </span>
        <div className="flex items-center mt-10">
          <p className="block  text-primary   text-lg font-bold mr-3">
            Tampilkan :
          </p>
          {numberOfDataOptionList(changeFinalRanking, numberOfFinalRankingData)}
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full mt-10">
            <thead>
              <tr className="border-t-2 border-b-2 border-gray-300">
                <td className="p-2 font-bold text-primary bg-primary bg-opacity-20 ">
                  Ticker
                </td>
                <td className="p-2 font-bold text-primary ">Preferensi</td>
                <td className="p-2 font-bold text-primary ">Ranking</td>
              </tr>
            </thead>
            <tbody>{finalRankingComponent}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CountDetail;

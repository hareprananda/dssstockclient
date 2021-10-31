import React, { useEffect, useRef, useState } from "react";
import Icon from "src/assets/Icon";
import Backdrop from "src/components/Element/Backdrop/Backdrop";
import Loader from "src/components/Loader/Loader";
import useRequest from "src/hooks/useRequest";
import ReducerActions from "src/redux/ReducerAction";
import { useAppDispatch } from "src/redux/ReduxHook";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import { ResponseDssCriteria } from "src/request/DSS/RequestDSSType";

interface Props {
  open: boolean;
  currentCriteria: ResponseDssCriteria;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BobotModal: React.FC<Props> = ({ open, currentCriteria, setOpen }) => {
  const [criteriaData, setCriteria] = useState<ResponseDssCriteria>([]);
  const criteriaDataRef = useRef<ResponseDssCriteria>([]);
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const { RequestAuthenticated } = useRequest();

  const submitChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoader(true);
    RequestAuthenticated(ConfigDSS.updateCriteria(criteriaData))
      .then(() => {
        dispatch(ReducerActions.request.reRequestCountDss());
        setOpen(false);
      })
      .catch(() => null)
      .finally(() => setShowLoader(false));
  };
  useEffect(() => {
    if (open) criteriaDataRef.current = currentCriteria;
    else if (!open) criteriaDataRef.current;
    setCriteria(criteriaDataRef.current);
  }, [open]);

  const changeBobot =
    (id: number, key: "keterangan" | "bobot") =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const value =
        key === "keterangan"
          ? e.target.value
          : isNaN(parseInt(e.target.value))
          ? ""
          : parseInt(e.target.value);
      const criteriaIndex = criteriaDataRef.current.findIndex(
        (data) => data._id === id
      );
      if (criteriaIndex !== -1) {
        const newData = criteriaDataRef.current.map((data, idx) =>
          idx === criteriaIndex ? { ...data, [key]: value } : data
        );
        criteriaDataRef.current = newData;
        setCriteria(newData);
      }
    };
  const toggle = () => {
    setOpen((current) => !current);
  };
  return (
    <>
      <Backdrop show={open} />
      <div
        style={{
          left: "50%",
          top: "10px",
          maxHeight: "calc(100% - 25px)",
          transform: "translate(-50%, 0)",
        }}
        className={`md:max-w-xl md:w-full fixed bg-white z-50 border-2 border-gray-500 rounded-lg px-6 py-4 ${
          !open && "hidden"
        } `}
      >
        <div className="border-b-2 border-gray-200 py-2 flex justify-between items-center">
          <h1 className="text-primary font-bold text-2xl">Update Bobot</h1>
          <div className="cursor-pointer" onClick={toggle}>
            <Icon.CancelIcon
              width="22.309"
              height="22.309"
              fill="rgba(0,0,0,0.4)"
            />
          </div>
        </div>
        <form onSubmit={submitChange} className="pb-12 relative">
          <div style={{ maxHeight: "calc(100vh - 150px)", overflow: "auto" }}>
            {criteriaData.map((criteria) => (
              <div className="mb-4 mt-2" key={criteria._id}>
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor={"name"}
                >
                  {criteria.nama}
                </label>
                <div className="flex">
                  <select
                    className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={"name"}
                    name={"name"}
                    onChange={changeBobot(criteria._id, "bobot")}
                    value={criteria.bobot}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <select
                    onChange={changeBobot(criteria._id, "keterangan")}
                    value={criteria.keterangan}
                    className="ml-3 shadow appearance-none border rounded-2xl w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="benefit">Benefit</option>
                    <option value="cost">Cost</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          {showLoader && (
            <div className="absolute bg-opacity-20 top-0 left-0 w-full h-full grid place-items-center">
              <Loader />
            </div>
          )}
          <div className="flex justify-between py-3 absolute w-full">
            <button
              className="text-primary bg-softPrimary2 rounded px-3 py-2 font-semibold"
              type="button"
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white rounded px-3 py-2 font-semibold"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BobotModal;

import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    function removeListener() {
      window?.removeEventListener("resize", handleResize);
      window?.removeEventListener("load", handleResize);
    }

    window?.addEventListener("resize", handleResize);
    window?.addEventListener("load", handleResize);

    handleResize();

    return removeListener;
  }, []);

  return size;
};

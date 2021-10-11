import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Ticker: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.ticker);
  }, []);
  return <div></div>;
};

export default Ticker;

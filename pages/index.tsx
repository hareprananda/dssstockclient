import type { NextPage } from "next";
import { useEffect } from "react";
import InitialLayout from "src/components/layout/InitialLayout";
import { Page } from "src/types/Page";

const Home: Page = () => {
  useEffect(() => {
    alert("mantap");
  }, []);
  return <h1>Group</h1>;
};

export default Home;

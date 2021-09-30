import React, { ReactElement } from "react";
import { Page } from "src/types/Page";

const Layout = <T extends Page>(ChildComponent: T, Wrapper: React.FC) => {
  ChildComponent.getLayout = function getLayout(page: ReactElement) {
    return <Wrapper>{page}</Wrapper>;
  };
};

export default Layout;

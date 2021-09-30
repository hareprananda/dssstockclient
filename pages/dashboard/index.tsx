import React, { ReactElement } from "react";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import DashboardLayout from "src/components/layout/DashboardLayout";
import { Page } from "src/types/Page";
import Layout from "src/utils/layout/Layout";

const Dashboard: Page = () => {
  return <h1>This is dashboard yang baru</h1>;
};
export default withProtected(Dashboard);

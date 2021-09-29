import React from "react";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>This is dashboard</h1>
    </div>
  );
};

export default withProtected(Dashboard);

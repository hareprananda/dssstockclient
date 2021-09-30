import React from "react";

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div>
      <h1>This is dashboard Layout</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;

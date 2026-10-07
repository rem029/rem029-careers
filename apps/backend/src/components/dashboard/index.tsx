import React from "react";

import CareersApplicationChart from "./careers";
import PageViewChart from "./page";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col px-24 py-1 max-md:px-4 gap-4">
      <CareersApplicationChart />
      <PageViewChart />
    </div>
  );
};

export default Dashboard;

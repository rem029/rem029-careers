import { Career, CareersApplication } from "payload/generated-types";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

interface ChartByJobCountProps {
  applications: CareersApplication[];
}
const LABEL = "Applications per Job";
const ChartByJobCount = ({ applications }: ChartByJobCountProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const chartData: Record<string, number> = {};

    applications.forEach((application: CareersApplication) => {
      const jobTitle = (application.career as Career)?.title || "Unknown Job";
      chartData[jobTitle] = (chartData[jobTitle] || 0) + 1;
    });

    setData({
      labels: Object.keys(chartData),
      datasets: [
        {
          label: LABEL,
          data: Object.values(chartData),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [applications]);

  if (!data) {
    return <p>Loading charts...</p>;
  }

  return (
    <Bar
      className="flex-1 w-full"
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: LABEL,
          },
        },
      }}
      style={{ maxHeight: "420px" }}
    />
  );
};

export default ChartByJobCount;

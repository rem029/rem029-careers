import { CareersApplication } from "payload/generated-types";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

interface ChartByCountryProps {
  applications: CareersApplication[];
}
const LABEL = "Applications by Country";
const ChartByCountry = ({ applications }: ChartByCountryProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const chartData: Record<string, number> = {};

    applications.forEach((application: CareersApplication) => {
      const country = application.country_of_residence || "Unknown Country";
      chartData[country] = (chartData[country] || 0) + 1;
    });

    setData({
      labels: Object.keys(chartData),
      datasets: [
        {
          label: LABEL,
          data: Object.values(chartData),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    });
  }, [applications]);

  if (!data) {
    return <p>Loading charts...</p>;
  }

  return (
    <Pie
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
    />
  );
};

export default ChartByCountry;

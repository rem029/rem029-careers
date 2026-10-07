import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CareersApplication } from "payload/generated-types";

interface ChartByApplicationsOverTimeProps {
  applications: CareersApplication[];
}

const LABEL = "Applications Over Time";

const ChartByApplicationsOverTime = ({
  applications,
}: ChartByApplicationsOverTimeProps) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const applicationsByDate: Record<string, number> = {};
    const labelsSet = new Set<string>();

    // Process the data to group by date
    applications.forEach((application) => {
      const createdAt = new Date(application.createdAt);
      const date = createdAt.toISOString().split("T")[0]; // Group by date (YYYY-MM-DD)
      applicationsByDate[date] = (applicationsByDate[date] || 0) + 1;
      labelsSet.add(date);
    });

    const labels = Array.from(labelsSet).sort(); // Sort labels (dates) in ascending order

    const data = labels.map((label) => applicationsByDate[label] || 0); // Fill missing dates with 0

    setChartData({
      labels,
      datasets: [
        {
          label: LABEL,
          data,
          borderColor: "#36A2EB", // Blue line
          backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue background
          borderWidth: 2,
        },
      ],
    });
  }, [applications]);

  if (!chartData) {
    return <p>Loading chart...</p>;
  }

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: LABEL,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Count",
            },
          },
        },
      }}
      style={{ maxHeight: "420px", width: "100%" }}
    />
  );
};

export default ChartByApplicationsOverTime;

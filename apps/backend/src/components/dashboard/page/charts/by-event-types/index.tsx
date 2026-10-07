import { Analytics } from "payload/generated-types";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

interface ChartByEventTypesProps {
  data: Analytics[];
}
const LABEL = "Analytics Events";
const ChartByEventTypes = ({ data }: ChartByEventTypesProps) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const eventTypesData: Record<string, number> = {};

    for (const item of data) {
      eventTypesData[item.eventType] = (eventTypesData[item.eventType] || 0) + 1;
    }

    const eventTypeLabels = Object.keys(eventTypesData);
    const eventTypeCounts = Object.values(eventTypesData);

    setChartData({
      labels: eventTypeLabels,
      datasets: [
        {
          label: LABEL,
          data: eventTypeCounts,
          backgroundColor: "#00D072",
          borderColor: "#E5B420",
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  if (!chartData) {
    return <p>Loading chart...</p>;
  }

  return (
    <Bar
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
      }}
    />
  );
};

export default ChartByEventTypes;

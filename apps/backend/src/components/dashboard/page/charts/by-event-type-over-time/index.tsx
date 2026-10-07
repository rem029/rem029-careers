import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Analytics } from "payload/generated-types";

interface ChartByEventTypeOverTimeProps {
  data: Analytics[];
}

const ChartByEventTypeOverTime = ({ data }: ChartByEventTypeOverTimeProps) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const eventTypeData: Record<string, Record<string, number>> = {};
    const labelsSet = new Set<string>();

    // Process the data to group by event type and date
    data.forEach((item) => {
      // Ensure createdAt is a valid date
      const createdAt = new Date(item.createdAt);
      if (isNaN(createdAt.getTime())) {
        console.error(`Invalid date for createdAt: ${item.createdAt}`);
        return;
      }

      const date = createdAt.toISOString().split("T")[0]; // Group by date (YYYY-MM-DD)
      const eventType = item.eventType;

      if (!eventTypeData[eventType]) {
        eventTypeData[eventType] = {};
      }

      eventTypeData[eventType][date] = (eventTypeData[eventType][date] || 0) + 1;
      labelsSet.add(date);
    });

    const labels = Array.from(labelsSet).sort(); // Sort labels (dates) in ascending order

    const color = {
      page_view: "#FFFFFF",
      click: "#34f52e",
      form_submission: "#2e7ff5",
      error: "#f5462e",
    };

    const datasets = Object.keys(eventTypeData).map((eventType) => ({
      label: eventType,
      data: labels.map((label) => eventTypeData[eventType][label] || 0), // Fill missing dates with 0
      borderColor: color[eventType], // Random color for each line
      backgroundColor: "rgba(0,0,0,0)", // Transparent background for line chart
      borderWidth: 2,
    }));

    setChartData({
      labels,
      datasets,
    });
  }, [data]);

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
            text: "Event Types Over Time",
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

export default ChartByEventTypeOverTime;

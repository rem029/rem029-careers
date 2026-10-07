import { useConfig } from "payload/dist/admin/components/utilities/Config";
import { Analytics, Career } from "payload/generated-types";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

interface ChartByPageViewsProps {
  data: Analytics[];
}

const LABEL = "Page Views Events";

const ChartByPageViews = ({ data }: ChartByPageViewsProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const config = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${config.serverURL}${config.routes.api}/careers`;
      const limit = "limit=0";
      const responseCareers = await fetch(`${baseUrl}?${limit}`);
      const { docs: careersDocs } = await responseCareers.json();
      const pageViewsData: Record<string, number> = {};

      for (const item of data) {
        if (item.eventType === "page_view") {
          let name = item.path;

          if (name.includes("/jobs/")) {
            const nameSplit = name.split("/");
            const id = nameSplit[nameSplit.length - 1];

            const career = (careersDocs as Career[]).find((c) => c.id === id);
            name = career ? `(${career.title}) - ${name}` : `(Unknown) - ${name}`;
          }
          pageViewsData[name] = (pageViewsData[name] || 0) + 1;
        }
      }

      const pageViewsLabels = Object.keys(pageViewsData);
      const pageViewsCounts = Object.values(pageViewsData);

      setChartData({
        labels: pageViewsLabels,
        datasets: [
          {
            label: LABEL,
            data: pageViewsCounts,
            backgroundColor: "#00D072",
            borderColor: "#E5B420",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, [data]);

  if (!chartData) {
    return <p>Loading chart...</p>;
  }

  return (
    <Bar
      data={chartData}
      options={{
        indexAxis: "y", // Switch to horizontal bar
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

export default ChartByPageViews;

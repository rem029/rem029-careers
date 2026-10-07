import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { useConfig } from "payload/dist/admin/components/utilities/Config";
import { Analytics } from "payload/generated-types";
import { getDefaultDates } from "../../../helper/date";
import PageViewFilter from "./filters";
import ChartByEventTypes from "./charts/by-event-types";
import ChartByPageViews from "./charts/by-page-views";
import ChartByEventTypeOverTime from "./charts/by-event-type-over-time";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

const PageViewChart: React.FC = () => {
  const { today, sevenDaysAgo } = getDefaultDates();

  const [pageViews, setPageViews] = useState<Analytics[]>([]);
  const [startDate, setStartDate] = useState<string>(sevenDaysAgo);
  const [endDate, setEndDate] = useState<string>(today);
  const config = useConfig();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const baseUrl = `${config.serverURL}${config.routes.api}/analytics`;

        const formattedEndDate = new Date(endDate);
        formattedEndDate.setHours(23, 59, 59, 999);
        const formattedStartDate = new Date(startDate);
        formattedStartDate.setHours(0, 0, 0, 0);

        const limit = "limit=0";
        const endDateQuery = `where[createdAt][less_than_equal]=${formattedEndDate.toISOString()}`;
        const startDateQuery = `where[createdAt][greater_than_equal]=${formattedStartDate.toISOString()}`;

        const responseAnalytics = await fetch(
          `${baseUrl}?${limit}&${startDateQuery}&${endDateQuery}`,
        );
        const { docs: analyticsDocs } = await responseAnalytics.json();

        setPageViews(analyticsDocs);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };

    fetchAnalytics();
  }, [startDate, endDate]);

  return (
    <div className="flex flex-1 flex-col px-24 py-4 max-md:px-4 gap-4">
      <div className="flex flex-col w-full">
        <h3>Page Analytics Dashboard (last 7 days preview)</h3>

        <PageViewFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <div className="flex-1 flex flex-row gap-4 max-md:flex-col max-md:gap-1">
          <div className="flex-1">
            <ChartByEventTypes data={pageViews} />
          </div>
          <div className="flex-1">
            <ChartByPageViews data={pageViews} />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 max-md:flex-col max-md:gap-1">
          <ChartByEventTypeOverTime data={pageViews} />
        </div>
      </div>
    </div>
  );
};

export default PageViewChart;

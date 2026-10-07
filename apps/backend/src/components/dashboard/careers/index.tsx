import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Career, CareersApplication, CareersQuery } from "payload/generated-types";
import { useConfig } from "payload/dist/admin/components/utilities/Config";
import CareersApplicationFilter from "./filters";
import CareersApplicationTable from "./table";
import { getDefaultDates } from "../../../helper/date";
import { TableHeader } from "../../../types";
import ChartByCountry from "./charts/by-country";
import ChartByNationality from "./charts/by-nationality";
import ChartByJobCount from "./charts/by-job";
import ChartByApplicationsOverTime from "./charts/by-applications-over-time";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const CareersApplicationChart: React.FC = () => {
  const { today, sevenDaysAgo } = getDefaultDates();

  const [applications, setApplications] = useState<CareersApplication[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>(sevenDaysAgo);
  const [endDate, setEndDate] = useState<string>(today);

  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string[]>([]);

  const [filteredApplications, setFilteredApplications] = useState<
    CareersApplication[]
  >([]);

  const config = useConfig();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const baseUrl = `${config.serverURL}${config.routes.api}/careers-application`;

        const formattedEndDate = new Date(endDate);
        formattedEndDate.setHours(23, 59, 59, 999);
        const formattedStartDate = new Date(startDate);
        formattedStartDate.setHours(0, 0, 0, 0);

        const limit = "limit=0";
        const endDateQuery = `where[createdAt][less_than_equal]=${formattedEndDate.toISOString()}`;
        const startDateQuery = `where[createdAt][greater_than_equal]=${formattedStartDate.toISOString()}`;

        const response = await fetch(
          `${baseUrl}?${limit}&${startDateQuery}&${endDateQuery}`,
        );
        const { docs } = await response.json();

        setApplications(docs);
      } catch (error) {
        console.error("Error fetching applications data:", error);
      }
    };

    fetchApplications();
  }, [config.serverURL, config.routes.api, startDate, endDate]);

  useEffect(() => {
    const filtered = applications.filter((application) => {
      const career = application.career as Career;
      const matchesPosition =
        selectedPosition.length === 0 ||
        selectedPosition.includes(career?.title || "");

      const matchesQuestion =
        selectedQuestion.length === 0 ||
        application.career_queries?.some((query) =>
          selectedQuestion.includes((query.item as CareersQuery)?.title || ""),
        );

      const matchesResponse =
        selectedResponse.length === 0 ||
        application.career_queries?.some((query) =>
          selectedResponse.includes(query.response || ""),
        );

      return matchesPosition && matchesQuestion && matchesResponse;
    });

    setFilteredApplications(filtered);
  }, [applications, selectedPosition, selectedQuestion, selectedResponse]);

  useEffect(() => {
    const uniqueQuestions = new Set<string>();
    const uniqueResponses = new Set<string>();

    filteredApplications.forEach((application: CareersApplication) => {
      application.career_queries?.forEach((query) => {
        uniqueQuestions.add(
          (query.item as CareersQuery)?.title || "Unknown Question",
        );
        uniqueResponses.add(query.response || "No Response");
      });
    });

    setQuestions(Array.from(uniqueQuestions));
    setResponses(Array.from(uniqueResponses));
  }, [filteredApplications]);

  useEffect(() => {
    const uniquePositions = new Set<string>();

    applications.forEach((application: CareersApplication) => {
      const career = application.career as Career;
      uniquePositions.add(career?.title || "Unknown Job");
    });

    setPositions(Array.from(uniquePositions));
  }, [applications]);

  return (
    <div className="flex w-full flex-col box-border px-24 py-4 max-md:px-4 gap-4">
      <div className="flex flex-col w-full">
        <h3>Careers Dashboard (preview)</h3>

        <div className="flex flex-row max-md:flex-col gap-4">
          <div className="max-md:w-full max-md:max-w-full max-w-[240px]">
            <CareersApplicationFilter
              positions={positions}
              questions={questions}
              responses={responses}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              selectedResponse={selectedResponse}
              setSelectedResponse={setSelectedResponse}
              setStartDate={setStartDate}
              startDate={startDate}
              setEndDate={setEndDate}
              endDate={endDate}
            />
          </div>

          <div className="flex flex-col flex-1 max-h-screen overflow-y-auto max-md:h-full">
            <div className="flex-1">
              <CareersApplicationTable
                table={{ headers: tableHeaders, data: filteredApplications }}
              />
            </div>

            <div className="flex-1">
              <ChartByJobCount applications={filteredApplications} />
            </div>

            <div className="flex flex-row">
              <div className="w-full max-h-[320px] max-md:max-h-[240px]">
                <ChartByCountry applications={filteredApplications} />
              </div>
              <div className="w-full max-h-[320px] max-md:max-h-[240px]">
                <ChartByNationality applications={filteredApplications} />
              </div>
            </div>

            <div className="flex-1">
              <ChartByApplicationsOverTime applications={filteredApplications} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const tableHeaders: TableHeader<CareersApplication>[] = [
  { label: "Resume", key: "resume" },
  { label: "Created At", key: "createdAt" },
  { label: "Career", key: "career" },
  { label: "Category", key: "career.category" },
  { label: "Work type", key: "career.work_type" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "First Name", key: "first_name" },
  { label: "Last Name", key: "last_name" },
  { label: "Country", key: "country_of_residence" },
  { label: "Nationality", key: "nationality" },
];

export default CareersApplicationChart;

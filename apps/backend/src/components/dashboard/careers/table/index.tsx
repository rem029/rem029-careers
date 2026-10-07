import {
  Career,
  CareersApplication,
  CareersMedia,
  CareersQuery,
  CareersWorkType,
  Category,
} from "payload/generated-types";
import React, { useMemo } from "react";
import { CSVLink } from "react-csv";
import { TableHeader } from "../../../../types";
import { Headers } from "react-csv/lib/core";

export interface CareersApplicationTableProps {
  table: { headers: TableHeader<CareersApplication>[]; data: CareersApplication[] };
}

const CareersApplicationTable = ({ table }: CareersApplicationTableProps) => {
  const csv = useMemo(() => {
    let newData = [];
    let newHeaders: Headers = [...table.headers];

    for (const data of table.data) {
      const dataCopy: object = { ...data };
      const dataCareer = data.career as Career;
      const dataCareerCategory = dataCareer.category as Category;
      const dataCareerWorkType = dataCareer.work_type as CareersWorkType;
      const dataResume = data.resume as CareersMedia;

      for (const queries of data.career_queries) {
        const title = (queries.item as CareersQuery).title;
        dataCopy[title] = queries.response;

        const existingHeader =
          newHeaders.filter((h) => h.label.includes(title)).length > 0;

        if (!existingHeader) {
          newHeaders = [...newHeaders, { label: title, key: title }];
        }
      }

      for (const { key } of newHeaders) {
        if (key === "career") {
          dataCopy[key] = dataCareer?.title || "Unknown";
        }
        if (key === "career.category") {
          dataCopy[key] = dataCareerCategory?.title || "Unknown";
        }
        if (key === "career.work_type") {
          dataCopy[key] = dataCareerWorkType?.title || "Unknown";
        }
        if (key === "resume") {
          dataCopy[key] = dataResume?.url || "NA";
        }
        if (key === "createdAt") {
          dataCopy[key] = new Date(dataCopy[key]).toLocaleDateString(undefined, {
            dateStyle: "full",
          });
        }
      }

      newData = [...newData, dataCopy];
    }

    return { headers: newHeaders, data: newData };
  }, [table.data, table.headers]);

  return (
    <div className="mt-4 flex flex-col w-full">
      <div className="flex flex-1 flex-row items-center justify-between">
        <h6 className="font-bold text-opacity-20 p-0 m-0">
          Table View&nbsp;
          <span className="text-sm font-medium italic text-opacity-50">
            {csv.data.length}&nbsp;Applicant(s) found
          </span>
        </h6>

        <CSVLink
          data={csv.data}
          headers={csv.headers}
          filename="filtered_applications.csv"
          className="px-6 py-1"
        >
          Export CSV
        </CSVLink>
      </div>
      <div className="flex flex-1 w-full overflow-x-auto max-h-[720px] overflow-y-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-gray-400">
            <tr>
              {csv.headers.map((header) => {
                return (
                  <th
                    key={header.key}
                    className="min-w-[90px] text-sm border border-solid border-gray-300 border-opacity-5 px-4 py-2 text-center"
                  >
                    {header.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {csv.data.map((row, index) => {
              return (
                <tr key={index}>
                  {csv.headers.map((header) => {
                    return (
                      <td
                        key={header.key as string}
                        className="text-center border border-solid border-gray-300 border-opacity-5 px-4 py-2"
                      >
                        {renderCellContent(row, header)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const renderCellContent = (row: any, header: TableHeader<CareersApplication>) => {
  switch (header.key) {
    case "resume":
      const nameSplit = row?.resume?.split("/");
      const fileName = nameSplit ? nameSplit[nameSplit.length - 1] : "";
      return (
        <a
          className="text-sm"
          href={row?.resume || "#"}
          target="_blank"
          rel="noreferrer"
        >
          {fileName}
        </a>
      );

    default:
      return <span className="text-sm align-middle h-full">{row[header.key]}</span>;
  }
};

export default CareersApplicationTable;

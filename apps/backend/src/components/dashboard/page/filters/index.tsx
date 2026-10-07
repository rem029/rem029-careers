import React from "react";

export interface PageViewFilterProps {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
}

const PageViewFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: PageViewFilterProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="start-date" className="text-sm font-semibold">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="end-date" className="text-sm font-semibold">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default PageViewFilter;

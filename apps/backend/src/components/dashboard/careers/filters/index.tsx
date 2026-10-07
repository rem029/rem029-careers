import React, { useState } from "react";

export interface CareersApplicationFilterProps {
  setSelectedPosition: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPosition: string[];
  setSelectedQuestion: React.Dispatch<React.SetStateAction<string[]>>;
  selectedQuestion: string[];
  setSelectedResponse: React.Dispatch<React.SetStateAction<string[]>>;
  selectedResponse: string[];
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  positions: string[];
  questions: string[];
  responses: string[];
}

const CareersApplicationFilter = ({
  selectedPosition,
  setSelectedPosition,
  selectedQuestion,
  setSelectedQuestion,
  setSelectedResponse,
  selectedResponse,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  positions,
  questions,
  responses,
}: CareersApplicationFilterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  return (
    <div className="w-full p-1 border rounded-md shadow-sm">
      <button
        onClick={toggleCollapse}
        className="w-full text-left text-lg font-semibold bg-transparent border-gray-200 border-2 px-4 py-2 rounded-md"
      >
        {isCollapsed ? "+ Filters" : "- Filters"}
      </button>

      {!isCollapsed && (
        <div className="mt-4">
          {/* <h4 className="text-lg font-semibold mb-4">Filters</h4> */}

          <div className="w-full flex flex-col gap-2 max-md:flex-row">
            <div className="w-full flex-1">
              <h5 className="text-md font-bold mb-2">Positions</h5>
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
                {positions.map((position) => (
                  <label key={position} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedPosition.includes(position)}
                      onChange={() =>
                        handleCheckboxChange(
                          position,
                          selectedPosition,
                          setSelectedPosition,
                        )
                      }
                    />
                    {position}
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full flex-1">
              <h5 className="text-md font-bold mb-2">Questions</h5>
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
                {questions.map((question) => (
                  <label key={question} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedQuestion.includes(question)}
                      onChange={() =>
                        handleCheckboxChange(
                          question,
                          selectedQuestion,
                          setSelectedQuestion,
                        )
                      }
                    />
                    {question}
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full flex-1">
              <h5 className="text-md font-bold mb-2">Responses</h5>
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
                {responses.map((response) => (
                  <label key={response} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedResponse.includes(response)}
                      onChange={() =>
                        handleCheckboxChange(
                          response,
                          selectedResponse,
                          setSelectedResponse,
                        )
                      }
                    />
                    {response}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="start-date" className="block text-sm font-medium mb-1">
              Start Date:
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="end-date" className="block text-sm font-medium mb-1">
              End Date:
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersApplicationFilter;

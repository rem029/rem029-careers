import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export interface CareersPaginationProp {
  className: string;
  options: {
    limit: number;
    page: number;
    totalDocs: undefined | null | number;
    nextPage: undefined | null | number;
    totalPages: undefined | null | number;
  };
  handlePaginationLimitChange?: (value: number) => void;
  handlePaginatioPrevious?: () => void;
  handlePaginatioNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

const CareersPagination = ({
  className,
  options,
  disablePrev,
  disableNext,
  handlePaginationLimitChange,
  handlePaginatioPrevious,
  handlePaginatioNext,
}: CareersPaginationProp) => {
  return (
    <div className={className}>
      <button
        className={`join-item btn btn-sm btn-outline btn-info ${
          disablePrev ? "disabled" : ""
        }`}
        disabled={disablePrev}
        onClick={handlePaginatioPrevious}
      >
        <FaArrowLeftLong
          className={` text-md ${disablePrev ? "text-info" : "text-primary"}`}
        />
      </button>
      <select
        value={options.limit}
        className="select select-sm select-bordered join-item"
        name="contact_info:department"
        onChange={(e) =>
          handlePaginationLimitChange &&
          handlePaginationLimitChange(Number(e.target.value))
        }
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

      <button
        className={`join-item btn btn-sm btn-outline btn-info ${
          disableNext ? "disabled" : ""
        }`}
        disabled={disableNext}
        onClick={handlePaginatioNext}
      >
        <FaArrowRightLong
          className={` text-md ${disableNext ? "text-info" : "text-primary"}`}
        />
      </button>
    </div>
  );
};

export default CareersPagination;

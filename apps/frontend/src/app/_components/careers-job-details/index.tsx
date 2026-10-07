import { FaArrowLeftLong } from "react-icons/fa6";
import CareersJobDetailsInfo from "./job-details-info";
import CareersJobDetailsForm from "./job-details-form";
import { Career } from "@/payload-types";
import Link from "next/link";
import { fontPrimary } from "@/app/fonts";

export interface CareersJobDetailsProps {
  jobInfo: Career;
}

const CareersJobDetails = ({ jobInfo }: CareersJobDetailsProps) => {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto flex flex-col flex-1 gap-1 items-center">
      <div className="w-full max-w-7xl flex flex-row gap-4 py-1 max-md:px-2 max-lg:px-1">
        <Link href={`/jobs`} className="flex flex-row items-center gap-1 text-sm">
          <FaArrowLeftLong className="text-gray-500 text-xs" />
          <h1 className={`text-gray-500  text-sm ${fontPrimary.className}`}>
            Back to Careers
          </h1>
        </Link>
      </div>
      <div className="w-full max-w-7xl flex flex-row gap-4 py-10 max-[768px]px-4 max-[768px]:px-4 max-md:flex-col box-border">
        <CareersJobDetailsInfo career={jobInfo} />
        <CareersJobDetailsForm career={jobInfo} />
      </div>
    </div>
  );
};

export default CareersJobDetails;

import { fontPrimary, fontSecondary } from "@/app/fonts";
import { Career, CareersWorkType, Category } from "@/payload-types";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../common/button";

interface CareersItemProps {
  item: Career;
}

const CareersItem = ({ item }: CareersItemProps) => {
  return (
    <div className="w-full min-h-36 rounded-lg bg-white shadow-md flex flex-col gap-4 px-2 py-2">
      <h1 className={`${fontPrimary.className} text-4xl`}>{item.title}</h1>
      <div className={`${fontPrimary.className} text-gray-400 text-xs`}>
        {(item.category as Category)?.title}
      </div>
      <div className="flex flex-row flex-1 gap-4">
        <div
          className={`${fontSecondary.className} text-gray-500 text-xs w-full max-w-36 min-h-4 rounded-full bg-white border-gray-500 border-[1px] flex flex-row justify-center items-center`}
        >
          {(item.work_type as CareersWorkType)?.title}
        </div>
      </div>

      <p className={`${fontSecondary.className} flex-1 text-gray-500 text-sm`}>
        {item?.description || ""}
      </p>

      <div className="w-full flex flex-col items-end">
        <Button
          block={{
            blockType: "block-button",
            buttonId: `jobs-apply-now-${item.id}`,
            title: "Apply now",
            url: `/jobs/${item.id}`,
            variant: "secondary",
          }}
          textSize="sm"
          btnSize="sm"
          maxWidth={180}
        />
      </div>
    </div>
  );
};

export default CareersItem;

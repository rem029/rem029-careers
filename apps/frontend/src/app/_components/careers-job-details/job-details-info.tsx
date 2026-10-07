import { fontDefault, fontPrimary, fontSecondary } from "@/app/fonts";
import { serializeSlate } from "@/lib/serialize";
import { Career, Category } from "@/payload-types";

export interface CareersJobDetailsInfoProps {
  career: Career;
}

const CareersJobDetailsInfo = ({ career }: CareersJobDetailsInfoProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className={`text-4xl ${fontPrimary.className}`}>{career.title}</h1>
      <span className={`text-sm text-gray-500 ${fontPrimary.className}`}>
        {(career.category as Category)?.title}
      </span>
      <span className={`text-sm text-secondary ${fontPrimary.className}`}>
        Job Reference#
      </span>
      <span className={`text-sm text-gray-400 ${fontSecondary.className}`}>
        {career.code ? career.code : career.id}
      </span>

      {/* <span className="text-sm text-gray-500">{career.description}</span> */}

      <span
        className={`${fontSecondary.className} [&>*]:text-gray-500 [&>*]:!text-sm [&>ul>li]:!list-item [&>ul>li]:!text-sm [&>h6]:!text-lg [&>h5]:!text-xl [&>h4]:!text-2xl [&>h3]:!text-3xl [&>h2]:!text-4xl [&>h1]:!text-5xl`}
      >
        {serializeSlate(career.description_rt)}
      </span>

      {career?.responsibilities_rt && (
        <>
          <span className={`text-md text-secondary ${fontPrimary.className}`}>
            Responsibilities
          </span>
          <div
            className={`${fontSecondary.className} [&>*]:text-gray-500 [&>*]:!text-sm [&>ol>li]:!list-item [&>ol>li]:!text-sm [&>ul>li]:!list-item [&>ul>li]:!text-sm [&>h6]:!text-lg [&>h5]:!text-xl [&>h4]:!text-2xl [&>h3]:!text-3xl [&>h2]:!text-4xl [&>h1]:!text-5xl`}
          >
            {serializeSlate(career?.responsibilities_rt)}
          </div>
        </>
      )}

      {career?.qualifications_rt && (
        <>
          <span className={`text-md text-secondary ${fontPrimary.className}`}>
            Qualifications
          </span>
          <div
            className={`${fontSecondary.className} [&>*]:text-gray-500 [&>*]:!text-sm [&>ul>li]:!list-item [&>ul>li]:!text-sm [&>h6]:!text-lg [&>h5]:!text-xl [&>h4]:!text-2xl [&>h3]:!text-3xl [&>h2]:!text-4xl [&>h1]:!text-5xl`}
          >
            {serializeSlate(career?.qualifications_rt)}
          </div>
        </>
      )}
    </div>
  );
};

export default CareersJobDetailsInfo;

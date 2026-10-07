"use client";

import {
  Career,
  CareersApplication,
  CareersInfoSetting,
  CareersMedia,
  CareersQuery,
} from "@/payload-types";
import { FileWithPayloadID } from "@/types";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { countries, TCountryCode } from "countries-list";
import ErrorMessage from "../common/error-message";
import SuccessMessageForm from "../common/success-message";
import {
  addAnalytics,
  fetchCareersInfoSettings,
  fetchCareersJobInfoById,
  postCareersJob,
  postUploadMedia,
  verifyCaptcha,
} from "@/lib/api";
import CountrySelect from "../common/country-select-old";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import Loading from "../common/loading";
import { usePathname } from "next/navigation";
import { fontPrimary, fontSecondary } from "@/app/fonts";
import { Button } from "../common/button";
import { NEXT_PUBLIC_CF_SITE_KEY } from "@/utils/constant";

export interface CareersJobDetailsFormProps {
  career: Career;
}

const defaultFields: CareersApplication = {
  career: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  nationality: "",
  country_of_residence: "",
  nationalIdPassportNumber: "",
  resume: -1,
  career_queries: [],
  createdAt: "",
  updatedAt: "",
  id: "",
};

type QuestionResponseType = Record<number, { response: string }>;
type QuestionFilesType = Record<number, { response: FileWithPayloadID }>;

const FieldRequiredIndicator = () => <span className="!text-red-500">*</span>;

const CareersJobDetailsForm = ({ career }: CareersJobDetailsFormProps) => {
  const [captchaSuccess, setCaptchSuccess] = useState(false);
  const [captchaVerifySuccess, setCaptchaVerifySuccess] = useState(false);
  const captchaRef = useRef<TurnstileInstance>();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<"fill-up" | "success">("fill-up");
  const [files, setFiles] = useState<FileWithPayloadID[]>([]);
  const [fields, setFields] = useState({ ...defaultFields, career: career.id });
  const [questionResponses, setQuestionRespones] = useState<QuestionResponseType>(
    {},
  );
  const [questionFiles, setQuestionFiles] = useState<QuestionFilesType>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [careerLatestInfo, setCareerLatestInfo] = useState<Career>(career);
  const [careerSettingsInfo, setCareersSettingsInfo] =
    useState<CareersInfoSetting>();
  const pathname = usePathname();

  const resumeMaxSize = useMemo(() => {
    return careerSettingsInfo ? careerSettingsInfo?.resume_max_size || 3 : 3;
  }, [careerSettingsInfo]);

  useEffect(() => {
    const fetchLatestInfo = async () => {
      setContentLoading(true);
      const info = await fetchCareersJobInfoById(career.id);
      const settings = await fetchCareersInfoSettings();

      setCareersSettingsInfo(settings);
      setCareerLatestInfo(info as Career);
      setContentLoading(false);
    };

    fetchLatestInfo();
  }, [career.id]);

  const handleResumeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const maxSize = resumeMaxSize * 1024 * 1024;

      if (selectedFile.size > maxSize) {
        setFormError(
          `Selected file exceed the ${resumeMaxSize}MB limit and will not be uploaded.`,
        );
        return;
      }

      setFiles([selectedFile]);
    }
  };

  const handleChangeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let { value, name } = e.target;
    setFormError("");
    setFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleQuestionFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    paramMaxSize: number,
  ): void => {
    let { name, files } = event.target;
    const questionNameSplit = name.split(":");
    const questionId = Number(questionNameSplit[1] ? questionNameSplit[1] : -1);

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const maxSize = paramMaxSize * 1024 * 1024;

      if (selectedFile.size > maxSize) {
        setFormError(
          `Selected file exceed the ${paramMaxSize}MB limit and will not be uploaded.`,
        );
        return;
      }

      setQuestionFiles((prevState) => ({
        ...prevState,
        [questionId]: { response: selectedFile },
      }));
    }
  };

  const handleChangeQuestionsValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let { value, name } = e.target;
    const questionNameSplit = name.split(":");
    const questionId = Number(questionNameSplit[1] ? questionNameSplit[1] : -1);
    const questionResponse = value;
    setFormError("");
    setQuestionRespones((prevState) => ({
      ...prevState,
      [questionId]: { response: questionResponse },
    }));
  };

  const handleCountryChange = (name: string, value: string) => {
    setFormError("");
    const countryName = countries[value as TCountryCode]?.name || "";
    setFields((prevState) => ({
      ...prevState,
      [name]: countryName,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (captchaSuccess && captchaVerifySuccess) {
      setFormError("");

      const form = e.target as HTMLFormElement;

      if (!formRef.current) {
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (captchaRef.current?.isExpired()) {
        captchaRef.current.reset();
        return;
      }

      try {
        setSubmitLoading(true);

        const questionResponsesFormat = Object.keys(questionResponses).map(
          (key) => ({
            response: questionResponses[Number(key)]?.response || "",
            item: Number(key),
          }),
        );
        const responseUpload = await uploadSelectedFiles();

        if (responseUpload.length === 0 || !responseUpload)
          throw new Error("No resume found.");

        const responseQuestionUploads = await uploadQuestionFiles(questionFiles);

        const questionFilesFormat = Object.keys(responseQuestionUploads).map(
          (key) => ({
            response_file: responseQuestionUploads[Number(key)]?.id || undefined,
            item: Number(key),
          }),
        );

        const newEntry: CareersApplication = {
          ...fields,
          resume: (responseUpload[0] as CareersMedia).id,
          career_queries: [...questionResponsesFormat, ...questionFilesFormat],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const response = await postCareersJob(newEntry);
        await addAnalytics("form_submission", pathname, newEntry);

        if (typeof response === "string") {
          resetForm();
          throw Error(response);
        }

        setStep("success");
        resetForm();
      } catch (error) {
        setFormError(
          (error as Error)?.message || "Unknown Error. Contact IT department",
        );
        setStep("fill-up");
      } finally {
        captchaRef.current?.reset();
        setSubmitLoading(false);
      }
    } else {
      setFormError("CAPTCHA was not verified. Please refresh.");
    }
  };

  const resetForm = () => {
    formRef.current?.reset();
  };

  const uploadSelectedFiles = async (
    paramFiles?: FileWithPayloadID[],
  ): Promise<(CareersMedia | undefined)[]> => {
    paramFiles = paramFiles ? paramFiles : files;

    const response: (CareersMedia | undefined)[] = await Promise.all(
      paramFiles.map(async (f) => {
        const formData = new FormData();
        formData.append("file", f);

        const mediaResponse = await postUploadMedia(formData, "careers-media");

        return mediaResponse;
      }),
    );

    return response;
  };

  const uploadQuestionFiles = async (
    questionFiles: QuestionFilesType,
  ): Promise<{ [id: number]: CareersMedia | undefined }> => {
    let responseObject: { [id: number]: CareersMedia | undefined } = {};

    const response = await Promise.all(
      Object.keys(questionFiles).map(async (k) => {
        const id = Number(k);
        const formData = new FormData();
        formData.append("file", questionFiles[id].response);

        const mediaResponse = await postUploadMedia(formData, "careers-media");

        return { [id]: mediaResponse };
      }),
    );

    for (const res of response) {
      responseObject = { ...responseObject, ...res };
    }

    return responseObject;
  };

  const onCaptchaSuccess = async (token: string) => {
    setCaptchSuccess(true);
    const result = await verifyCaptcha(token);
    setCaptchaVerifySuccess(result);
  };

  const captchVerificationSuccess = captchaSuccess && captchaVerifySuccess;

  return (
    <>
      {formError && (
        <ErrorMessage message={formError} onClose={() => setFormError("")} />
      )}
      {step === "success" && (
        <div className="flex flex-1 flex-col">
          <SuccessMessageForm
            title="Application Submitted Successfully!"
            subtitle="Thank you for applying. Our team will review your application and get back to you soon."
          />
        </div>
      )}

      {step === "fill-up" && (
        <>
          {contentLoading && (
            <div className="flex flex-1 flex-col gap-4">
              <Loading />
            </div>
          )}
          {!contentLoading && (
            <>
              {!careerLatestInfo?.active && (
                <div className="flex flex-1 flex-col gap-4 text-center justify-center items-center">
                  <p
                    className={`${fontPrimary.className} text-4xl text-accent font-bold`}
                  >
                    Position Unavailable
                  </p>
                  <p className={`${fontSecondary.className} text-accent text-sm`}>
                    This position is no longer available, but your next opportunity
                    awaits. Explore other openings to become part of our
                    extraordinary team.
                  </p>
                  <Button
                    block={{
                      blockType: "block-button",
                      title: "Back to careers",
                      url: "/jobs",
                      variant: "secondary",
                    }}
                    btnSize="sm"
                    textSize="sm"
                    maxWidth={180}
                  />
                </div>
              )}
              {careerLatestInfo?.active && (
                <form
                  ref={formRef}
                  className="flex flex-1 flex-col gap-2"
                  onSubmit={handleSubmit}
                >
                  <h1 className={`${fontPrimary.className} text-4xl text-primary`}>
                    Apply for this Job
                  </h1>

                  <div className="flex flex-row gap-4 w-full max-md:flex-col max-md:gap-2">
                    <label className="form-control w-full max-w-lg pb-1">
                      <div className="label">
                        <span
                          className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                        >
                          Your first name <FieldRequiredIndicator />
                        </span>
                      </div>
                      <input
                        className="w-full max-w-lg input input-md max-md:input-sm input-bordered rounded-full"
                        placeholder="First name"
                        name="first_name"
                        required
                        onChange={handleChangeValue}
                        onBlur={handleChangeValue}
                        disabled={submitLoading}
                      />
                    </label>

                    <label className="form-control w-full max-w-lg pb-1">
                      <div className="label">
                        <span
                          className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                        >
                          Your last name <FieldRequiredIndicator />
                        </span>
                      </div>
                      <input
                        className="w-full max-w-lg input input-md max-md:input-sm input-bordered rounded-full"
                        placeholder="Last name"
                        name="last_name"
                        required
                        onChange={handleChangeValue}
                        onBlur={handleChangeValue}
                        disabled={submitLoading}
                      />
                    </label>
                  </div>

                  <div className="flex flex-row gap-4 w-full max-md:flex-col max-md:gap-2">
                    <label className="form-control w-full max-w-lg pb-1">
                      <div className="label">
                        <span
                          className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                        >
                          Phone <FieldRequiredIndicator />
                        </span>
                      </div>
                      <input
                        className="w-full max-w-lg input input-md max-md:input-sm input-bordered rounded-full"
                        placeholder="+974 33442211"
                        type="tel"
                        name="phone"
                        required
                        onChange={handleChangeValue}
                        onBlur={handleChangeValue}
                        disabled={submitLoading}
                      />
                    </label>

                    <label className="form-control w-full max-w-lg pb-1">
                      <div className="label">
                        <span
                          className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                        >
                          Email <FieldRequiredIndicator />
                        </span>
                      </div>
                      <input
                        type="email"
                        className="w-full max-w-lg input input-md max-md:input-sm input-bordered rounded-full"
                        placeholder="your@email.com"
                        name="email"
                        required
                        onChange={handleChangeValue}
                        onBlur={handleChangeValue}
                        disabled={submitLoading}
                      />
                    </label>
                  </div>

                  <div className="flex flex-row gap-4 w-full max-md:flex-col max-md:gap-2">
                    <label className="form-control w-full max-w-lg pb-1">
                      <div className="label">
                        <span
                          className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                        >
                          Country of residence <FieldRequiredIndicator />
                        </span>
                      </div>
                      <CountrySelect
                        name="country_of_residence"
                        onChange={(e, name) =>
                          handleCountryChange(name as string, e?.value || "")
                        }
                        required
                        disabled={submitLoading}
                      />
                    </label>

                    <label className="form-control w-full max-w-lg">
                      <div className="label">
                        <span
                          className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                        >
                          Nationality <FieldRequiredIndicator />
                        </span>
                      </div>
                      <CountrySelect
                        name="nationality"
                        onChange={(e, name) =>
                          handleCountryChange(name as string, e?.value || "")
                        }
                        required
                        disabled={submitLoading}
                      />
                    </label>
                  </div>

                  <label className="form-control w-full max-w-lg">
                    <div className="label">
                      <span
                        className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                      >
                        Passport# or QID# (If available) <FieldRequiredIndicator />
                      </span>
                    </div>
                    <input
                      className="w-full input input-md max-md:input-sm input-bordered rounded-full"
                      placeholder="Please enter..."
                      name="nationalIdPassportNumber"
                      required
                      onChange={handleChangeValue}
                      onBlur={handleChangeValue}
                      disabled={submitLoading}
                    />
                  </label>

                  <label className="form-control w-full max-w-lg">
                    <div className="label">
                      <span
                        className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                      >
                        Attach your CV/Resume <FieldRequiredIndicator />
                      </span>
                    </div>
                    <input
                      type="file"
                      name="resume"
                      required
                      className="w-full file-input rounded-full"
                      placeholder="Your CV"
                      accept=".doc,.docx,.pdf"
                      onChange={handleResumeFileChange}
                      disabled={submitLoading}
                    />
                    <div className="label">
                      <span
                        className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                      >
                        Only .doc, .docx and .pdf are accepted. Max {resumeMaxSize}{" "}
                        mb size
                      </span>
                    </div>
                  </label>

                  <div className="w-full flex flex-col gap-1 py-4">
                    {career?.career_queries && career.career_queries.length > 0 && (
                      <span
                        className={`${fontPrimary.className} label-text text-lg`}
                      >
                        Additional Questions
                      </span>
                    )}

                    {career.career_queries?.map((question, index) => {
                      const q = question?.item as CareersQuery;
                      const id = q?.id || index;
                      const qRequired = question?.required || false;
                      const qInputName = `career_questions:${id}`;
                      const qKey = "questions-" + id;

                      switch (q?.type) {
                        default: {
                          return <Fragment key={qKey}></Fragment>;
                        }
                        case "TextArea": {
                          return (
                            <label className="form-control w-full" key={qKey}>
                              <div className="label">
                                <span
                                  className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                                >
                                  {q.title} {qRequired && <FieldRequiredIndicator />}
                                </span>
                              </div>
                              <textarea
                                className="w-full input input-md max-md:input-sm input-bordered rounded-full h-48 max-md:h-24"
                                placeholder={"Please enter..."}
                                required={qRequired}
                                name={qInputName}
                                onChange={handleChangeQuestionsValue}
                              />
                            </label>
                          );
                        }
                        case "Dropdown": {
                          return (
                            <label className="form-control w-full" key={qKey}>
                              <div className="label">
                                <span
                                  className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                                >
                                  {q.title} {qRequired && <FieldRequiredIndicator />}
                                </span>
                              </div>
                              <select
                                className="w-full input input-md max-md:input-sm input-bordered rounded-full"
                                required={qRequired}
                                name={qInputName}
                                defaultValue=""
                                onChange={handleChangeQuestionsValue}
                                disabled={submitLoading}
                              >
                                <option disabled value="">
                                  Please choose...
                                </option>
                                {q?.options?.map((options, index) => (
                                  <option
                                    key={`careers_queries_idx_${
                                      options?.id || index
                                    }`}
                                    value={options.title as string}
                                  >
                                    {options.title}
                                  </option>
                                ))}
                              </select>
                            </label>
                          );
                        }
                        case "Number": {
                          return (
                            <label className="form-control w-full" key={qKey}>
                              <div className="label">
                                <span
                                  className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                                >
                                  {q.title} {qRequired && <FieldRequiredIndicator />}
                                </span>
                              </div>
                              <input
                                min={0}
                                type="number"
                                className="w-full input input-md max-md:input-sm input-bordered rounded-full"
                                placeholder={"Please enter..."}
                                required={qRequired}
                                name={qInputName}
                                onChange={handleChangeQuestionsValue}
                                disabled={submitLoading}
                              />
                            </label>
                          );
                        }
                        case "Text": {
                          return (
                            <label className="form-control w-full" key={qKey}>
                              <div className="label">
                                <span
                                  className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                                >
                                  {q.title} {qRequired && <FieldRequiredIndicator />}
                                </span>
                              </div>
                              <input
                                className="w-full input input-md max-md:input-sm input-bordered rounded-full"
                                placeholder={"Please enter..."}
                                required={qRequired}
                                name={qInputName}
                                onChange={handleChangeQuestionsValue}
                                disabled={submitLoading}
                              />
                            </label>
                          );
                        }
                        case "File": {
                          const qMaxSize = q?.file_max_size || 2;
                          return (
                            <label className="form-control w-full" key={qKey}>
                              <div className="label">
                                <span
                                  className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                                >
                                  {q.title} {qRequired && <FieldRequiredIndicator />}
                                </span>
                              </div>
                              <input
                                className="w-full file-input file-input-md max-md:file-input-sm file-bordered rounded-full"
                                type="file"
                                accept=".doc,.docx,.pdf"
                                placeholder={"Please select files..."}
                                required={qRequired}
                                name={qInputName}
                                onChange={(e) =>
                                  handleQuestionFileChange(e, qMaxSize)
                                }
                                disabled={submitLoading}
                              />
                              <div className="label">
                                <span
                                  className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                                >
                                  Only .doc, .docx and .pdf are accepted. Max{" "}
                                  {qMaxSize} mb size
                                </span>
                              </div>
                            </label>
                          );
                        }
                      }
                    })}
                  </div>

                  {careerLatestInfo?._status === "published" &&
                    careerLatestInfo.active && (
                      <button
                        type="submit"
                        className="btn btn-primary btn-md rounded-full text-white disabled:btn-info"
                        disabled={submitLoading || !captchVerificationSuccess}
                      >
                        {submitLoading ? "Submitting..." : "Submit"}
                        {submitLoading && (
                          <span className="loading loading-spinner loading-md"></span>
                        )}
                      </button>
                    )}

                  <div className="w-full text-center items-center flex flex-col gap-2 p-0 m-0 mt-2">
                    <span
                      className={`${fontPrimary.className} label-text text-info max-md:text-sm`}
                    >
                      Let us know your human
                    </span>
                    <Turnstile
                      ref={captchaRef}
                      siteKey={NEXT_PUBLIC_CF_SITE_KEY}
                      onSuccess={onCaptchaSuccess}
                      onError={() => setCaptchSuccess(false)}
                      onReset={() => setCaptchSuccess(false)}
                      onExpire={() => {
                        setCaptchSuccess(false);
                        setCaptchaVerifySuccess(false);
                        setFormError("CAPTCHA expired. Please complete it again.");
                        captchaRef.current?.reset();
                      }}
                      options={{
                        refreshTimeout: "manual",
                        refreshExpired: "manual",
                        action: "submit_form",
                        size: "normal",
                        appearance: "execute",
                      }}
                    />
                  </div>
                </form>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default CareersJobDetailsForm;

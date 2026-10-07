"use client";
import useDebounce from "@/app/_hooks/use-debounce";
import { Career, Category } from "@/payload-types";
import { useState, useMemo, useEffect, useCallback } from "react";
import CareersItem from "./item";
import CareersPagination from "./pagination";
import { useFetch } from "@/app/_hooks/use-fetch";
import { AUTH_HEADER } from "@/lib/api";
import { BACKEND_URL } from "@/utils/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Careers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [careersOption, setCareersOption] = useState({
    search: "",
    limit: 5,
    page: 1,
    department: selectedCategory ? selectedCategory : "",
    totalDocs: undefined,
    nextPage: undefined,
    totalPages: undefined,
  });

  const searchTextDebounce = useDebounce({
    value: careersOption.search,
    delay: 500,
  });

  const categoryTextDebounce = useDebounce({
    value: careersOption.department,
    delay: 300,
  });

  const {
    data: careersData,
    error: careersError,
    loading: careersLoading,
    refetch: careersRefetch,
  } = useFetch<{ docs: Career[] }>(
    `${BACKEND_URL}/api/careers?where[_status][equals]=published${
      selectedCategory ? `&where[category.title][contains]=${selectedCategory}` : ""
    }`,
    {
      method: "GET",
      headers: { ...AUTH_HEADER },
    },
  );

  const { data: categories, refetch: categoriesRefetch } = useFetch<{
    docs: Category[];
  }>(`${BACKEND_URL}/api/category`, {
    method: "GET",
    headers: { ...AUTH_HEADER },
  });

  useEffect(() => {
    handleDepartmentClick(selectedCategory || "");
  }, [selectedCategory]);

  useEffect(() => {
    categoriesRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const careers: Career[] = useMemo(() => {
    if (!careersLoading && !careersError && careersData) {
      return careersData.docs.length > 0 ? careersData.docs : [];
    }

    return [];
  }, [careersData, careersError, careersLoading]);

  const isPaginationDisabled: { prev: boolean; next: boolean } = useMemo(() => {
    return {
      next: careersOption.nextPage === undefined || careersOption.nextPage === null,
      prev: careersOption.page <= 1,
    };
  }, [careersOption]);

  useEffect(() => {
    setCareersOption((prevState) => ({
      ...prevState,
      totalDocs: (careersData as any)?.totalDocs,
      nextPage: (careersData as any)?.nextPage,
      totalPages: (careersData as any)?.totalPages,
    }));
  }, [careersData]);

  useEffect(() => {
    setCareersOption((prevState) => ({ ...prevState, page: 1 }));
  }, [searchTextDebounce]);

  useEffect(() => {
    handleCareersRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    careersOption.limit,
    careersOption.page,
    categoryTextDebounce,
    searchTextDebounce,
  ]);

  const handleCareersRefetch = async () => {
    const department = categoryTextDebounce;
    const urlBase = `/api/careers?where[_status][equals]=published`;
    const urlSearch = searchTextDebounce
      ? `&where[title][contains]=${searchTextDebounce}`
      : ``;
    const urlCategory = department
      ? `&where[category.title][contains]=${department}`
      : "";
    const urlPageOptions = `&limit=${careersOption.limit}&page=${careersOption.page}`;

    const url = `${BACKEND_URL}${urlBase}${urlSearch}${urlCategory}${urlPageOptions}`;

    if (department) {
      router.push(pathname + `?category=${department}`);
    } else {
      router.push(pathname);
    }

    careersRefetch(encodeURI(url), { method: "get", cache: "no-cache" });
  };

  const handleDepartmentClick = (departmentId: string) => {
    setCareersOption((prevState) => ({ ...prevState, department: departmentId }));
  };

  const handleSearchChange = (text: string) => {
    setCareersOption((prevState) => ({ ...prevState, search: text }));
  };

  const handlePaginatioNext = () => {
    setCareersOption((prevState) => ({ ...prevState, page: prevState.page + 1 }));
  };

  const handlePaginatioPrevious = () => {
    setCareersOption((prevState) => ({ ...prevState, page: prevState.page - 1 }));
  };

  const handlePaginationLimitChange = (value: number) => {
    setCareersOption((prevState) => ({ ...prevState, limit: value, page: 1 }));
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto flex flex-col flex-1 gap-10 max-md:px-2">
      <div className="w-full px-1 flex flex-col items-center">
        <div className="w-full max-w-7xl py-2 flex flex-row gap-1 justify-between overflow-visible">
          <input
            className="w-full max-w-lg input input-bordered rounded-full"
            placeholder="Search by title..."
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          <select
            className="select select-bordered w-full max-w-lg rounded-full"
            name="contact_info:department"
            onChange={(e) => handleDepartmentClick(e.target.value)}
            value={careersOption.department}
          >
            <option disabled>Select Department</option>
            <option value="">All Departments</option>
            {categories &&
              categories.docs.length > 0 &&
              categories.docs?.map((c, index) => (
                <option
                  value={c.title.toLowerCase()}
                  key={"contact_info:department" + index + 1}
                >
                  {c.title}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* <div className="w-full px-1 flex flex-col items-center ">
      <div className="w-full max-w-7xl flex flex-row gap-2 overflow-x-auto py-1">
        {departmentsLoading ? (
          <Loading />
        ) : (
          departments.map((d) => {
            return (
              <button
                key={"careers_idx_" + d.id}
                className={`btn btn-xs btn-secondary rounded-full min-w-24 text-xs ${
                  d.name === careersOption.department
                    ? "text-white"
                    : "btn-outline"
                }`}
                onClick={
                  d.name === careersOption.department
                    ? () => handleDepartmentClick("")
                    : () => handleDepartmentClick(d.name)
                }
              >
                {d.name}
              </button>
            );
          })
        )}
      </div>
    </div> */}

      <div className="w-full px-1 flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col gap-1">
          <span className="text-xs text-gray-400">
            Number of career(s) found: {careersOption.totalDocs}
          </span>
        </div>
      </div>

      <div className="w-full px-1 pb-2 flex flex-col items-center gap-4">
        <CareersPagination
          className="w-full max-w-7xl join flex flex-row flex-1 justify-end"
          options={{
            limit: careersOption.limit,
            nextPage: careersOption.nextPage,
            page: careersOption.page,
            totalDocs: careersOption.totalDocs,
            totalPages: careersOption.totalPages,
          }}
          disableNext={isPaginationDisabled.next}
          disablePrev={isPaginationDisabled.prev}
          handlePaginatioNext={handlePaginatioNext}
          handlePaginatioPrevious={handlePaginatioPrevious}
          handlePaginationLimitChange={handlePaginationLimitChange}
        />

        <div className="w-full max-w-7xl flex flex-col gap-2">
          {careersLoading ? (
            <span>Loading...</span>
          ) : (
            careers.map((career) => {
              return (
                <CareersItem
                  key={"career-item-" + (career?.id || "")}
                  item={career}
                />
              );
            })
          )}
        </div>
        <div className="w-full max-w-7xl join flex flex-row flex-1 justify-end">
          <span className="text-xs text-gray-400">Page {careersOption.page}</span>
        </div>

        <CareersPagination
          className="w-full max-w-7xl join flex flex-row flex-1 justify-end"
          options={{
            limit: careersOption.limit,
            nextPage: careersOption.nextPage,
            page: careersOption.page,
            totalDocs: careersOption.totalDocs,
            totalPages: careersOption.totalPages,
          }}
          disableNext={isPaginationDisabled.next}
          disablePrev={isPaginationDisabled.prev}
          handlePaginatioNext={handlePaginatioNext}
          handlePaginatioPrevious={handlePaginatioPrevious}
          handlePaginationLimitChange={handlePaginationLimitChange}
        />
      </div>
    </div>
  );
};

export default Careers;

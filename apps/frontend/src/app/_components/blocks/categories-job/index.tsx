"use client";

import { BlockCategories, Category, Media } from "@/payload-types";
import { FaSearch } from "react-icons/fa";
import { CardsWithOverlayContent } from "../../common/cards-with-overlay-content";
import { useEffect } from "react";
import { useFetch } from "@/app/_hooks/use-fetch";
import { AUTH_HEADER } from "@/lib/api";
import { BACKEND_URL } from "@/utils/constant";
import { Button } from "../../common/button";

export interface CategoriesJobProps {
  block: BlockCategories;
}

export default function CategoriesJob({ block }: CategoriesJobProps) {
  const {
    data: categories,
    loading: categoriesLoading,
    refetch: categoriesRefetch,
  } = useFetch<{ docs: Category[] }>(`${BACKEND_URL}/api/category`, {
    method: "GET",
    headers: { ...AUTH_HEADER },
  });

  useEffect(() => {
    categoriesRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center gap-12">
      {categoriesLoading && (
        <span className="loading loading-dots max-md:loading-sm loading-lg text-info"></span>
      )}
      {!categoriesLoading && (
        <>
          <div className="w-full items-center justify-between flex flex-row gap-8 py-2 max-lg:p-1 max-lg:bg-neutral max-lg:justify-start overflow-x-auto snap-mandatory snap-x scroll-smooth">
            {categories?.docs?.map((c) => {
              const img = c.image as Media;

              return (
                <CardsWithOverlayContent
                  key={`categories_idx_${c.id}`}
                  image={img}
                  link={encodeURI(`/jobs?category=${c.title.toLowerCase()}`)}
                  title={c?.title || ""}
                  content={
                    block?.show_job_count ? (
                      <span className="text-white text-xs">0 open jobs</span>
                    ) : undefined
                  }
                />
              );
            })}
          </div>
          <Button
            block={{
              blockType: "block-button",
              title: "View all",
              url: "/jobs",
              variant: "primary",
              buttonId: "categories-job-btn",
            }}
          />

          {block?.show_search && (
            <label className="input input-md input-primary input-bordered flex items-center rounded-full gap-2 w-full max-w-sm">
              <input
                type="text"
                className="grow"
                placeholder="Search by keyword..."
              />
              <FaSearch className="text-primary text-sm" />
            </label>
          )}
        </>
      )}
    </div>
  );
}

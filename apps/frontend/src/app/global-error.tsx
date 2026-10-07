"use client";
import { addAnalytics } from "@/lib/api";
import { defaultMedata } from "@/utils/metaData";
import { Metadata } from "next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Error boundaries must be Client Components

export const metadata: Metadata = defaultMedata;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);

    addAnalytics("error", pathname, error);
  }, [error, pathname]);

  return (
    <html>
      <head>
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </head>
      </head>
      <body>
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-2">
          <h2 className="text-accent text-lg font-bold">
            We’re updating this page. It will be available soon!
          </h2>
          <p className="text-accent text-lg">If you’d like to check again now.</p>
          <button
            className="link link-primary"
            onClick={() => window.location.reload()}
          >
            Refresh the page
          </button>
        </div>
      </body>
    </html>
  );
}

import { useState, useEffect } from "react";

type UseFetchResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: (url?: string, options?: RequestInit) => Promise<void>;
};

export const useFetch = <T,>(
  url: string,
  options?: RequestInit,
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (urlNew?: string, optionsNew?: RequestInit) => {
    try {
      setLoading(true);
      const response = await fetch(urlNew ? urlNew : url, {
        ...options,
        ...optionsNew,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading, refetch: fetchData };
};

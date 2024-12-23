import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios-instance";

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

const useCustomFetch = <T = any>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<T>(url);
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;

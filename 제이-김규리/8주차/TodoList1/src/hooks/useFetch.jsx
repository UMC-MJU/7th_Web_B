import { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axiosInstance.get(url, options);
        setData(response.data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

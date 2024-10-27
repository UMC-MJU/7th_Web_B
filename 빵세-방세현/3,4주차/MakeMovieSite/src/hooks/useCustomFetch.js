import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

const useCustomFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const pullUrl = `${url}?language=ko&page=1`;
    // 처음 렌더링 시 데이터를 우선적으로 받아옴
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(pullUrl);
        setData(response);
      } catch (error) {
        console.log(error);
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

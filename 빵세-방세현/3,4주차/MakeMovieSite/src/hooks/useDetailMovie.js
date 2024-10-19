import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

const useDetailMovie = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    // 처음 렌더링 시 데이터를 우선적으로 받아옴
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
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

export default useDetailMovie;

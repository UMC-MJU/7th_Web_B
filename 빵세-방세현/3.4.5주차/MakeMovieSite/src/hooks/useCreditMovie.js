import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

const useCreditMovie = (url) => {
  const [creditData, setCreditData] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isError2, setIsError2] = useState(false);
  useEffect(() => {
    // 처음 렌더링 시 데이터를 우선적으로 받아옴
    const fetchData = async () => {
      setIsLoading2(true);
      try {
        const response = await axiosInstance.get(url);
        setCreditData(response.data.cast);
      } catch (error) {
        console.log(error);
        setIsError2(true);
      } finally {
        setIsLoading2(false);
      }
    };
    fetchData();
  }, [url]);

  return { creditData, isLoading2, isError2 };
};

export default useCreditMovie;

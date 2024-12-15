import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../apis/axios-instance";

// 필요한 속성만 정의된 MovieData 타입
type MovieData = {
  page: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
  total_pages: number;
  total_results: number;
};

const useCustomFetch = (url:string) => {
  const [data, setData] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const pullUrl = `${url}?language=ko&page=1`;
    // 처음 렌더링 시 데이터를 우선적으로 받아옴
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<MovieData> = await axiosInstance.get(pullUrl);
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

  console.log(data);
  return { data, isLoading, isError };
};

export default useCustomFetch;

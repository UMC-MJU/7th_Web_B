import axiosInstance from "../../apis/axios-instance";

interface Movie {
  id: number;
  title: string;
  [key: string]: any;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const useGetMovies = async ({
  category,
  pageParam,
}: {
  category: string;
  pageParam: number;
}): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>(
    `/movie/${category}?language=ko-KR&page=${pageParam}&include_adult=false`
  );
  return data;
};

export default useGetMovies;

import axiosInstance from "../../apis/axios-instance";

// 카테고리 별 영화 가져오기

interface Movie {
  title: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  overview: string;
  id: number;
  poster_path: string;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MovieParam{
  category:  "popular" | "top_rated" | "upcoming" | "now_playing";
  pageParam: number;
}

const useGetMovies = async ({
  category,
  pageParam,
}: MovieParam): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>(
    `/movie/${category}?language=ko-KR&page=${pageParam}&include_adult=false`
  );
  return data;
};

export default useGetMovies;

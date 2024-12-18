import { axiosInstance } from "../../apis/axios-instance";

// 타입 별칭
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

type getMovieParams = {
  category: "popular" | "top_rated" | "upcoming" | "now_playing"; // API에서 지원하는 카테고리만 허용
  pageParam: number;
}
// Promise는 비동기 작업의 성공 및 실패 상태를 표현하는 객체
// axiosInstance.get은 Promise를 반환. 성공 시, MovieData형식의 데이터 / 실패 시, 에러 반환
const getMovies = async ({ category, pageParam }: getMovieParams) : Promise<MovieData> => {
  const { data } = await axiosInstance.get(
    `/movie/${category}?language=ko&page=${pageParam}`
  );

  return data;
};

export { getMovies };

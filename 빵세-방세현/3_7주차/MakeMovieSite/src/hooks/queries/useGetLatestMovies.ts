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

const useGetLatestMovies = async () :Promise<MovieData> => {

  // https://api.themoviedb.org/3/movie/latest \
  const { data } = await axiosInstance.get(
    `discover/movie?include_adult=true&include_video=true&language=ko&page=1&primary_release_year=2024&sort_by=popularity.desc&with_original_language=ko`
  );
  return data;
};

export { useGetLatestMovies };

import { axiosInstance } from "../../apis/axios-instance";

const useGetLatestMovies = async () => {
  // https://api.themoviedb.org/3/movie/latest \
  const { data } = await axiosInstance.get(
    `discover/movie?include_adult=true&include_video=true&language=ko&page=1&primary_release_year=2024&sort_by=popularity.desc&with_original_language=ko`
  );
  return data;
};

export { useGetLatestMovies };

import { useInfiniteQuery } from "@tanstack/react-query";
import useGetMovies from "./useGetMovies";

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

type Category = "popular" | "top_rated" | "upcoming" | "now_playing";


function useGetInfiniteMovies(category: Category) {
  return useInfiniteQuery<MoviesResponse, Error>({
    queryFn: ({ pageParam}) => useGetMovies({ category, pageParam}),
    queryKey: ["movies", category],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMovie = lastPage.results.at(-1);
      return lastMovie ? allPages.length + 1 : undefined;
    },
  });
}

export { useGetInfiniteMovies };
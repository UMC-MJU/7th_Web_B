import { useInfiniteQuery } from "@tanstack/react-query";
import useGetMovies from "./useGetMovies";

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

function useGetInfiniteMovies(category: string) {
  return useInfiniteQuery<MoviesResponse, Error>({
    queryFn: ({ pageParam = 1 }) => useGetMovies({ category, pageParam }),
    queryKey: ["movies", category],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMovie = lastPage.results.at(-1);
      return lastMovie ? allPages.length + 1 : undefined;
    },
  });
}

export { useGetInfiniteMovies };

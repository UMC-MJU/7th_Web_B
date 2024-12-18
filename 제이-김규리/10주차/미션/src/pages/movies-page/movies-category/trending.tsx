import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton";
import PaginationButton from "../../../components/pagination-button";
import axiosInstance from "../../../apis/axios-instance";

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
  results: Movie[];
  total_pages: number;
  page: number;
}

const useGetTrending = async ({ pageParam }: { pageParam: number }): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get(
    `/trending/movie/day?language=ko-KR&page=${pageParam}`
  );
  return data;
};

const TrendingPage = () => {
  const [page, setPage] = useState<number>(1);

  const {
    data: movies,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<MoviesResponse>({
    queryFn: () => useGetTrending({ pageParam: page }),
    queryKey: ["movies", "trending", page],
  });

  console.log(movies);
  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    if (movies && movies.total_pages > page) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) {
    return (
      <MovieContainer>
        {[...Array(20)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </MovieContainer>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생: {error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <MovieContainer>
        {movies?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isFetching && (
          <MovieContainer>
            {[...Array(5)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </MovieContainer>
        )}
      </MovieContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        <PaginationButton onClick={handlePrevious} disabled={page === 1 || isFetching}>
          이전
        </PaginationButton>
        <span style={{ color: "white", fontSize: "18px", padding: "0 10px" }}>{page} 페이지</span>
        <PaginationButton
          onClick={handleNext}
          disabled={(movies?.total_pages ?? 0) <= page || isFetching}
        > {/* movies?.total_page가 null 또는 undefined일 때 0을 반환 */}
          다음
        </PaginationButton>
      </div>
    </>
  );
};

export default TrendingPage;

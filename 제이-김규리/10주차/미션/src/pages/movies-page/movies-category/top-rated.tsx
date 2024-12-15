import React, { useEffect } from "react";
import { useGetInfiniteMovies } from "../../../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton";
import ClipLoader from "react-spinners/ClipLoader";

interface Movie {
  id: number;
  [key: string]: any;
}

interface MoviePage {
  results: Movie[];
}

const TopRatedPage: React.FC = () => {
  const {
    data: movies,
    isLoading,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  } = useGetInfiniteMovies("top_rated");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

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
        <h1 style={{ color: "white" }}>에러 발생</h1>
      </div>
    );
  }

  return (
    <>
      <MovieContainer>
        {movies?.pages.map((page: MoviePage) =>
          page.results.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        )}
        {isFetchingNextPage && (
          <MovieContainer>
            {[...Array(5)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </MovieContainer>
        )}
      </MovieContainer>
      <div
        ref={ref}
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {isFetching && <ClipLoader color={"#fff"} />}
      </div>
    </>
  );
};

export default TopRatedPage;

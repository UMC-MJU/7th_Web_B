import { useEffect } from "react";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton";
import { useGetInfiniteMovies } from "../../../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import ClipLoader from "react-spinners/ClipLoader";

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

interface MoviePage {
  results: Movie[];
}

const UpComingPage = () => {
  const {
    data: movies,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useGetInfiniteMovies("upcoming");

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

export default UpComingPage;

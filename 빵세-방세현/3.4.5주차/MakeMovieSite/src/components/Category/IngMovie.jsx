import React from "react";
import Card from "../FrameComponent/Card";
import MovieList from "../FrameComponent/MovieList";
import useCustomFetch from "../../hooks/useCustomFetch";
const IngMovie = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch("/movie/now_playing");

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩 중 입니다...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 중...</h1>
      </div>
    );
  }

  return (
    <MovieList>
      {movies.data?.results.map((movie) => {
        return <Card key={movie.id} movie={movie} />;
      })}
    </MovieList>
  );
};

export default IngMovie;

import React from "react";
import Card from "../FrameComponent/Card";
import MovieList from "../FrameComponent/MovieList";
import CardSkeleton from "../SkeletonUI/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useGetMovies } from "../../hooks/queries/useGetMovies";
const ComingMovie = () => {
  const {
    data: movies,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => useGetMovies({ category: "upcoming", pageParam: 1 }), // 매개변수가 있을 때는 화살표 함수 형식으로 작성해주어야 함.
    queryKey: ["movies", "upcoming"], // 카테고리까지 queryKey값에 넣어주어 다른 페이지에서 받아오는 데이터와 구분시켜줌.
    cacheTime: 10000, // 10초
    staleTime: 10000,
  });
  // ispending: 데이터를 불러오는 중입니다.
  // isLoading: 데이터를 불러오는 중이거나, 재시도 중일 때 true가 됨.

  if (isPending) {
    return (
      <MovieList>
        {Array.from({ length: 18 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </MovieList>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 처리중...</h1>
      </div>
    );
  }

  return (
    <MovieList>
      {movies?.results?.map((movie) => {
        return <Card key={movie.id} movie={movie} />;
      })}
    </MovieList>
  );
};

export default ComingMovie;

import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../FrameComponent/Card";
import MovieList from "../FrameComponent/MovieList";
import CardSkeleton from "../SkeletonUI/CardSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../../hooks/queries/getMovies";
import { useInView } from "react-intersection-observer";
const ComingMovie = () => {
  const {
    data: movies, // [page, pageParams]가 담김
    isLoading,
    isError,
    isFetching,
    fetchNextPage, // 다음 페이지를 호출하는 함수, getNextPageParam의 return값을 pageParam으로 사용
    hasNextPage, // getNextPageParam의 리턴값을 통해 다음 페이지가 있는지 판단
    isFetchingNextPage, // fetchNextPage를 통해 페칭이 되고 있는 상태인지 여부
  } = useInfiniteQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: ({ pageParam = 1 }) =>
      getMovies({ category: "upcoming", pageParam: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      // lastPage는 마지막으로 fetch된 데이터
      // allPages는 지금까지 fetch된 모든 페이지의 배열
      const lastMovie = lastPage.results.at(-1);

      // last무비가 존재하면 다음 페이지 번호로 allPages의 길이 + 1을 반환
      return lastMovie ? allPages?.length + 1 : undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0, // 0이면 요소가 1픽셀이라도 뷰포트에 들어오면 true, 1이면 완전히 들어왔을 때만 inview가 true
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage(); // 바로 함수를 호출하여 실행
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 처리중...</h1>
      </div>
    );
  }

  return (
    <MovieList>
      {movies?.pages?.map((page) =>
        page.results.map((movie) => <Card key={movie.id} movie={movie} />)
      )}
      <CheckView ref={ref}></CheckView>
      {isLoading ||
        (isFetchingNextPage && (
          <MovieList>
            {Array.from({ length: 18 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </MovieList>
        ))}
    </MovieList>
  );
};

export default ComingMovie;

const CheckView = styled.div`
  background-color: purple;
  width: 1px;
  height: 1px;
`;

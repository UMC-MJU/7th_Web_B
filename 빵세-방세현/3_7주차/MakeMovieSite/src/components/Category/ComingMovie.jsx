import React, { useState } from "react";
import styled from "styled-components";
import Card from "../FrameComponent/Card";
import MovieList from "../FrameComponent/MovieList";
import CardSkeleton from "../SkeletonUI/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../hooks/queries/getMovies";
const ComingMovie = () => {
  const [page, setPage] = useState(1);

  const {
    isLoading,
    isError,
    data: movies,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["movies", "upcoming", page],
    queryFn: () => getMovies({ category: "upcoming", pageParam: page }),
    keepPreviousData: true,
  });

  return (
    <PullScreen>
      {isLoading ? (
        <MovieList>
          {Array.from({ length: 18 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </MovieList>
      ) : isError ? (
        <div>에러 처리 중...</div>
      ) : (
        <MovieList>
          {movies?.results?.map((page) => (
            <Card key={page.id} movie={page} />
          ))}
        </MovieList>
      )}
      <Buttons>
        <PreviousButton
          page={page}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1 || isFetching}
        >
          이전
        </PreviousButton>
        <PageCount>
          {page}/{movies?.total_pages}
        </PageCount>
        <NextButton
          page={page}
          totalPage={movies?.total_pages}
          onClick={() => {
            if (!isPreviousData && page < movies?.total_pages) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={
            isPreviousData || page === movies?.total_pages || isFetching
          }
        >
          다음
        </NextButton>
      </Buttons>
    </PullScreen>
  );
};

export default ComingMovie;

const PullScreen = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageCount = styled.div`
  color: white;
  text-align: center;
`;

const Buttons = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const PreviousButton = styled.button`
  color: white;
  width: 150px;
  height: 30px;
  background-color: ${(props) =>
    props.page === 1 ? "gray" : "rgb(227, 62, 90)"};
  margin-right: 40px;
  border: 1px solid black;
`;

const NextButton = styled.button`
  color: white;
  width: 150px;
  height: 30px;
  background-color: ${(props) =>
    props.page === props.totalPage ? "gray" : "rgb(227, 62, 90)"};
  margin-left: 40px;
  border: 1px solid black;
`;

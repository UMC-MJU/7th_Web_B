import React, { useState } from "react";
import styled from "styled-components";
import Card from "../FrameComponent/Card";
import MovieList from "../FrameComponent/MovieList";
import CardSkeleton from "../SkeletonUI/CardSkeleton";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMovies } from "../../hooks/queries/getMovies";


const IngMovie = () => {
  const [page, setPage] = useState<number>(1);

  const {
    isLoading,
    isError,
    data: movies,
    isFetching,
    isPlaceholderData
  } = useQuery({
    queryKey: ["movies", "upcoming", page],
    queryFn: () => getMovies({ category: "upcoming", pageParam: page }),
    placeholderData: keepPreviousData
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
          // Nullish Coalescing Oprator : 왼쪽 피연산자가 null 또는 undefined일 경우 오른쪽 값을 반환
          // 이를 통해 null값 혹은 undefined인 초기 상태 오류를 방지
          totalPage={movies?.total_pages??0}
          onClick={() => {
            if (!isPlaceholderData && page < (movies?.total_pages??0)) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={
            isPlaceholderData || page === movies?.total_pages || isFetching
          }
        >
          다음
        </NextButton>
      </Buttons>
    </PullScreen>
  );
};

export default IngMovie;

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

// 중요!!!!!
// Styled-components는 기본적으로 HTML 요소의 속성만 허용하므로 page와 같은 커스텀 속성은 타입을 정의해줘야 함. 
// styled-components에서 < >는 제네릭 x
const PreviousButton = styled.button<{page: number}>`
  color: white;
  width: 150px;
  height: 30px;
  background-color: ${(props) =>
    props.page === 1 ? "gray" : "rgb(227, 62, 90)"};
  margin-right: 40px;
  border: 1px solid black;
`;

const NextButton = styled.button<{page: number , totalPage:number}>`
  color: white;
  width: 150px;
  height: 30px;
  background-color: ${(props) =>
    props.page === props.totalPage ? "gray" : "rgb(227, 62, 90)"};
  margin-left: 40px;
  border: 1px solid black;
`;

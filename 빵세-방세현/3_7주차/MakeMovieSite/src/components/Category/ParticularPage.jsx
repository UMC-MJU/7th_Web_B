import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useCreditMovie from "../../hooks/useCreditMovie";
import MovieList from "../FrameComponent/MovieList";
import MovieIntro from "../FrameComponent/MovieIntro";
import CharacterProfile from "../FrameComponent/CharacterProfile";
import { useQuery } from "@tanstack/react-query";
import { useGetParticularMV } from "../../hooks/queries/useGetParticularMV";
import { useGetCreditMV } from "../../hooks/queries/useGetCreditMV";

const ParticularPage = () => {
  const { movieId } = useParams();

  const {
    data: movies,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryFn: () => useGetParticularMV({ movieId: movieId }),
    queryKey: ["movies", "particular"],
    cacheTime: 10000, // 10초
    staleTime: 10000,
  });

  const {
    data: creditData,
    isPending: isLoading2,
    isError: isError2,
  } = useQuery({
    queryFn: () => useGetCreditMV({ movieId: movieId }),
    queryKey: ["movies", "credit"],
    cacheTime: 10000, // 10초
    staleTime: 10000,
  });

  if (isLoading || isLoading2) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩 중 입니다...</h1>
      </div>
    );
  }

  if (isError || isError2 || !movies) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 중...</h1>
      </div>
    );
  }

  // movies가 undefined일 경우 처리
  if (!movies) {
    return (
      <Container>
        <h1 style={{ color: "white" }}>영화 정보를 찾을 수 없습니다.</h1>
      </Container>
    );
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movies?.backdrop_path}`;

  return (
    <DetailPage>
      <MovieImg src={imageUrl}></MovieImg>
      <MovieIntro movies={movies}></MovieIntro>
      <MovieList>
        <CharacterProfile creditData={creditData.cast} />
      </MovieList>
    </DetailPage>
  );
};

export default ParticularPage;

const DetailPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw; // 너비를 100%로 설정
  height: 100vh;
`;
const MovieImg = styled.img`
  width: 100%;
  max-height: 50vh; // 최대 높이를 70vh로 설정하여 화면을 넘어가지 않도록 함
  object-fit: cover; // 이미지 비율을 유지하며 잘리도록 설정
`;

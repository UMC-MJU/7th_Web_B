import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useCreditMovie from "../../hooks/useCreditMovie";
import MovieList from "./FrameComponent/MovieList";
import MovieIntro from "./FrameComponent/MovieIntro";
import CharacterProfile from "./FrameComponent/CharacterProfile";
import useCustomFetch from "../../hooks/useCustomFetch";
const ParticularPage = () => {
  const { movieId } = useParams();

  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`movie/${movieId}`); // 커스텀 훅 다시 만들어야 함. 데이터를 받을 때 구조 틀린 것 같음.!

  console.log(movies);
  const { creditData, isLoading2, isError2 } = useCreditMovie(
    `movie/${movieId}/credits?language=ko`
  );
  console.log(creditData);

  if (isLoading || isLoading2) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩 중 입니다...</h1>
      </div>
    );
  }

  if (isError || isError2 || !movies?.data) {
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

  const imageUrl = `https://image.tmdb.org/t/p/w500${movies?.data?.backdrop_path}`;

  return (
    <DetailPage>
      <MovieImg src={imageUrl}></MovieImg>
      <MovieIntro movies={movies}></MovieIntro>
      <MovieList>
        <CharacterProfile creditData={creditData} />
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

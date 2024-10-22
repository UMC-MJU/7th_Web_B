import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useDetailMovie from "../../hooks/useDetailMovie";
import useCreditMovie from "../../hooks/useCreditMovie";
import MovieList from "./FrameComponent/MovieList";
const ParticularPage = () => {
  const { movieId } = useParams();

  const {
    data: movies,
    isLoading,
    isError,
  } = useDetailMovie(`movie/${movieId}?language=ko`); // 커스텀 훅 다시 만들어야 함. 데이터를 받을 때 구조 틀린 것 같음.!

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

  if (isError || isError2) {
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

  const imageUrl = `https://image.tmdb.org/t/p/w500${movies.backdrop_path}`;

  return (
    <DetailPage>
      <MovieImg src={imageUrl}></MovieImg>
      <Introduce>
        <Title>{movies.title}</Title>
        <SmallIntro>평균: {movies.vote_average}</SmallIntro>
        <SmallIntro>개봉: {movies.release_date}</SmallIntro>
        <SmallIntro>{movies.runtime}분</SmallIntro>
        <TagLine>{movies.tagline}</TagLine>
        <Overview>{movies.overview}</Overview>
      </Introduce>
      <MovieList>
        {creditData?.map((creditInfor) => {
          return (
            <CreditCard>
              <CreditImg
                src={`https://image.tmdb.org/t/p/w200${creditInfor.profile_path}`}
              ></CreditImg>
              <ActorName>{creditInfor.original_name}</ActorName>
              <InMovieName>{creditInfor.character}</InMovieName>
            </CreditCard>
          );
        })}
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
const Title = styled.h2`
  font-size: 40px;
  color: white;
`;
const Msg = styled.div`
  color: white;
`;
const MovieImg = styled.img`
  width: 100%;
  max-height: 50vh; // 최대 높이를 70vh로 설정하여 화면을 넘어가지 않도록 함
  object-fit: cover; // 이미지 비율을 유지하며 잘리도록 설정
`;

const Introduce = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const SmallIntro = styled.div`
  color: white;
  font-size: 16px;
`;

const TagLine = styled.div`
  color: white;
  font-size: 25px;
  margin-top: 10px;
  font-style: italic;
`;

const Overview = styled.div`
  color: white;
  font-size: 16px;
  margin-top: 10px;
`;

const CreditCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 250px;
  border: 1px solid black;
  margin-right: 30px;
  margin-bottom: 20px;
`;

const CreditImg = styled.img`
  width: 200px;
  height: 150px;
  border: 1px solid white;
  border-radius: 40%;
  object-fit: cover; // 잘릴 때 이미지 비율 유지
`;

const ActorName = styled.div`
  color: white;
  font-size: 20px;
`;

const InMovieName = styled.div`
  color: white;
  font-size: 15px;
`;

import React from "react";
import styled from "styled-components";

const MovieIntro = ({ movies }) => {
  return (
    <Introduce>
      <Title>{movies.data.title}</Title>
      <SmallIntro>평균: {movies.data.vote_average}</SmallIntro>
      <SmallIntro>개봉: {movies.data.release_date}</SmallIntro>
      <SmallIntro>{movies.data.runtime}분</SmallIntro>
      <TagLine>{movies.data.tagline}</TagLine>
      <Overview>{movies.data.overview}</Overview>
    </Introduce>
  );
};

export default MovieIntro;

const Introduce = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const Title = styled.h2`
  font-size: 40px;
  color: white;
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
  width: 800px;
`;

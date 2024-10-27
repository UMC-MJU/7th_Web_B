import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = ({ movie }) => {
  const navigate = useNavigate();

  const movieParticularPage = () => {
    navigate(`../movie/${movie.id}`, {
      state: {
        movieId: movie.id,
      },
    });
  };

  return (
    <Entire onClick={movieParticularPage}>
      <EachImage
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt="영화 포스터"
      ></EachImage>
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieDate>{movie.release_date}</MovieDate>
    </Entire>
  );
};

export default Card;

const Entire = styled.button`
  background-color: black;
  display: flex;
  flex-direction: column;
  width: 190px;
  // justify-content: center;
  align-items: center;
  border: 0px;
`;
const EachImage = styled.img`
  width: 130px;
  height: 180px;
  border: 1px solid black;
  border-radius: 5px;
  // margin-left: 50px;
`;

const MovieTitle = styled.div`
  color: white;
  font-size: 13px;
`;

const MovieDate = styled.div`
  color: white;
  font-size: 12px;
  margin-bottom: 20px;
`;

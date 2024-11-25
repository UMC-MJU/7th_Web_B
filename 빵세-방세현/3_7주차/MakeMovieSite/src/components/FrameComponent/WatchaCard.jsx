import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WatchaCard = ({ movie }) => {
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
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        alt="영화 포스터"
      ></EachImage>
      <MovieTitle>{movie.title}</MovieTitle>
    </Entire>
  );
};

export default WatchaCard;

const Entire = styled.button`
  background-color: black;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  border: 0px;
`;
const EachImage = styled.img`
  width: 270px;
  height: 160px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 10px;
`;

const MovieTitle = styled.div`
  color: white;
  font-size: 20px;
`;

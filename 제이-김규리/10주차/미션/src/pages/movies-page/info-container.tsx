import styled from "styled-components";

const StyledContainer = styled.div`
  width: 50%;
  height: 100%;
  position: absolute; // 부모요소가 relative
  top: 0;
  left: 0;
  padding-top: 5px;
  padding-left: 5px;
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

  @media (max-width: 1400px) {
    width: 70%;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const MovieTitle = styled.div`
  font-size: 35px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MovieInfo = styled.div`
  font-size: 16px;
  color: white;
`;

const MovieTag = styled.div`
  font-size: 25px;
  color: white;
  margin: 20px 0;
  font-style: italic;
`;

const MovieOverview = styled.div`
  font-size: 15px;
  color: white;
  width: 90%;
`;

interface Movie {
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  overview: string;
}

interface InfoContainerProps {
  movie: Movie;
}

const InfoContainer = ({ movie }: InfoContainerProps) => {
  return (
    <StyledContainer>
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieInfo>평균 {movie.vote_average}</MovieInfo>
      <MovieInfo>{movie.release_date}</MovieInfo>
      <MovieInfo>{movie.runtime}분</MovieInfo>
      <MovieTag>{movie.tagline}</MovieTag>
      <MovieOverview>{movie.overview}</MovieOverview>
    </StyledContainer>
  );
};

export default InfoContainer;

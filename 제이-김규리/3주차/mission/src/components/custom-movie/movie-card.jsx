import styled from "styled-components";

const StyledCard = styled.div`
  width: 126px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
  margin: 20px 10px;
  &:hover {
    transform: scale(1.05); /* 마우스 호버 시 카드 확대 */
  }
`;

const MovieDate = styled.div`
  font-size: 12px;
  color: white;
  margin: 0 5px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 75%;
`;

const MovieTitle = styled.div`
  font-size: 15px;
  color: white;
  font-weight: bold;
  margin: 0 5px;
  margin-top: 3px;
`;

// 구조분해 할당
const MovieCard = ({movie}) => {
  return(
      <StyledCard>
          <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
           alt={movie.title} />
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieDate>{movie.release_date}</MovieDate>
      </StyledCard>
  );
}


export default MovieCard;
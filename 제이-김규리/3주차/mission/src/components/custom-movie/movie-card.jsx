import styled from "styled-components";

const MovieCard = styled.div`
  width: 135px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
  margin: 20px 10px;
  &:hover {
    transform: scale(1.05); /* 마우스 호버 시 카드 확대 */
  }
`;

export default MovieCard;
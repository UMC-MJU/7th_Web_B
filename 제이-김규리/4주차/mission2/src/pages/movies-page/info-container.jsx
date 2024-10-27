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

    /* 화면 너비가 1400px 이하일 때만 해당 스타일 적용 */
    @media(max-width: 1400px){
        width: 70%;
    }

     /* 화면 너비가 1000px 이하일 때만 해당 스타일 적용 */
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

const InfoContainer = ({movie}) => {
    return (
        <StyledContainer>
            <MovieTitle>{movie.data.title}</MovieTitle>
            <MovieInfo>평균 {movie.data.vote_average}</MovieInfo>
            <MovieInfo>{movie.data.release_date}</MovieInfo>
            <MovieInfo>{movie.data.runtime}분</MovieInfo>
            <MovieTag>{movie.data.tagline}</MovieTag>
            <MovieOverview>{movie.data.overview}</MovieOverview>
        </StyledContainer>
    );
}

export default InfoContainer;
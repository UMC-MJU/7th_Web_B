import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCustomFetch from "../../hooks/useCustomFetch";
import styled from "styled-components";
import InfoContainer from "./info-container";
import PersonInfo from "./person-info";
import useGetDetail from '../../hooks/queries/useGetDetail';

const StyledBannerContainer = styled.div`
    width: 100%;
    height: 350px;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin-top: 10px;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const DetailPage = () => {
    const {movieId} = useParams();
    // const {data: movie, isLoading, isError} = useCustomFetch(`/movie/${movieId}?language=ko-KR&page=1`);
    // const {data: credits, isLoading: isCreditLoading, isError: isCreditError} = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR&page=1`);

    const { data, isPending, isError } = useQuery({
        queryFn: () => useGetDetail({ movieId }),
        queryKey: ['movieDetail', movieId],
    });

    console.log(data);
    if(isPending){
        return <div>
            <h1 style={{color: 'white'}}>로딩 중 입니다..</h1>
        </div>
    }

    // 요청실패, 데이터 객체 확인, 내부 데이터 속성 확인 !!!!!!!!
    if(isError){
        return <div>
        <h1 style={{color: 'white'}}>에러 발생</h1>
    </div>
    }


    // const cast = credits.data.cast;
    // const director = credits.data.crew;

    const { movie, credits } = data;
    console.log(data)
    console.log(movie)
    console.log(credits)

    const cast = credits.cast;
    const director = credits.crew;
    return(
        <div>
            <StyledBannerContainer>
                <StyledImg src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>
                {/* <h1 style={{color: 'white'}}>Movie Detail for ID: {movieId}</h1> */}
                <InfoContainer movie={movie}/>
            </StyledBannerContainer>
            <div>
                <h1 style={{color: 'white'}}>감독/출연</h1>

                {/* cast = 등장인물, crew = 감독 */}
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {cast.map((actor) => (
                        <PersonInfo key={actor.id} person={actor}/>
                    ))}
                </div>
                <div style={{ height: '100px' }}></div>

                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {director.map((person) => (
                        <PersonInfo key={person.id} person={person}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
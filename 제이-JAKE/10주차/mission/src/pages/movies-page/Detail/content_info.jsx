import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import PersonInfo from "../person-info";
import useGetDetail from '../../../hooks/queries/useGetDetail';


const ContentPage = () => {
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
    /* console.log("data: ", data)
    console.log("movie: ", movie)
    console.log("credits: ", credits) */

    const cast = credits.cast;
    const director = credits.crew;
    return(
        <div>
            <p style={{color: 'white', fontWeight: 'bold', fontSize: '20px', marginLeft: '13px', marginBottom: '10px'}}>감독/출연</p>

            {/* cast = 등장인물, crew = 감독 */}
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {cast.map((actor) => (
                    <PersonInfo key={`actor-${actor.id}`} person={actor}/>
                ))}
            </div>
            <div style={{ height: '100px' }}></div>

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {director.map((person) => (
                    <PersonInfo key={`director-${person.id}`} person={person}/>
                ))}
            </div>
        </div>     
    );
}

export default ContentPage;
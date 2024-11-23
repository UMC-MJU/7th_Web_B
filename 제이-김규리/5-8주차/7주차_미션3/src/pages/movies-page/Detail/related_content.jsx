import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import useGetRecommendation from "../../../hooks/queries/useGetRecommendation";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton.jsx";
import PaginationButton from "../../../components/pagination-button.js";

const RelatedPage = () => {
    const {movieId} = useParams();

    const { data, isPending, isError, isFetching } = useQuery({
        queryFn: () => useGetRecommendation({ movieId }),
        queryKey: ['movieRecommendation', movieId],
    });

    console.log(data);
    if(isPending){
        return (
            <MovieContainer>
                {[...Array(10)].map((_, idx) => (
                    <SkeletonCard key={idx} />
                ))}
            </MovieContainer>
        );

    }

    // 요청실패, 데이터 객체 확인, 내부 데이터 속성 확인 !!!!!!!!
    if(isError){
        return <div>
        <h1 style={{color: 'white'}}>에러 발생</h1>
    </div>
    }

    // 데이터가 없을 때 처리
    if (!data || !data.related?.results?.length) {
        return (
            <div>
                <h1 style={{ color: 'white' }}>추천 콘텐츠를 찾을 수 없습니다.</h1>
            </div>
        );
    }

    console.log("data: ", data);
    const {related} = data;
    console.log("related: ", related.results);

    return(
        <div>
            <p style={{color: 'white', fontWeight: 'bold', fontSize: '20px', marginLeft: '13px', marginBottom: '0'}}>추천 콘텐츠</p>
            <MovieContainer>
                {related.results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                {isFetching && (
                    <MovieContainer>
                        {[...Array(5)].map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))}
                    </MovieContainer>
                )}
            </MovieContainer>
 
        </div>
    );
}

export default RelatedPage;
import {useState, useEffect} from "react";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import useCustomFetch from "../../../hooks/useCustomFetch.js";

const UpComingPage = () => {
    const {data: movies, isLoading, isError} = useCustomFetch(`/movie/upcoming?language=ko-KR&page=1`);

    if(isLoading){
        return <div>
            <h1 style={{color: 'white'}}>로딩 중 입니다..</h1>
        </div>
    }

    if(isError){
        return <div>
        <h1 style={{color: 'white'}}>에러 발생</h1>
    </div>
    }

    return(
        <MovieContainer>
            {movies.data?.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>                    
            ))}
        </MovieContainer>
    );
};

export default UpComingPage;
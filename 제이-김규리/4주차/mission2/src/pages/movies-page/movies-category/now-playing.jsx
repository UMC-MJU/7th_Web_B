import {useState, useEffect} from "react";
import useCustomFetch from "../../../hooks/useCustomFetch.js";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";

const NowPlayingPage = () => {
    const {data: movies, isLoading, isError} = useCustomFetch(`/movie/now_playing?language=ko-KR&page=1`);

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
    //console.log(movies.data);
    return (
        <MovieContainer>
            {movies.data?.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </MovieContainer>
    );
}

export default NowPlayingPage;
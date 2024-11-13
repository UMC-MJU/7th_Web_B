import {useState, useEffect} from "react";
import useCustomFetch from "../../../hooks/useCustomFetch.js";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton.jsx";
import useGetMovies from "../../../hooks/queries/useGetMovies.js";
import {useQuery} from "@tanstack/react-query"

const NowPlayingPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/now_playing?language=ko-KR&page=1`);

    const {data: movies, isPending, isError} = useQuery({
        queryFn: () => useGetMovies({category: 'now_playing', pageParam: 1}),
        queryKey: ['movies', 'now_playing'], 
    })
    //console.log(movies.results);

    // isPending: 데이터를 불러오는 중, 데이터가 로딩중일때 isPending true
    // isLoading: 데이터를 불러오는 중이거나, 재시도 중 일때 true가 됨
    if(isPending){
        return (
            <MovieContainer>
                {movies?.results?.map((movie) => (
                    <SkeletonCard key={movie.id}/>
                ))}
            </MovieContainer>
        );
    }

    if(isError){
        return <div>
        <h1 style={{color: 'white'}}>에러 발생</h1>
    </div>
    }
    //console.log(movies.data);
    return (
        <MovieContainer>
            {movies?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </MovieContainer>
    );
}

export default NowPlayingPage;
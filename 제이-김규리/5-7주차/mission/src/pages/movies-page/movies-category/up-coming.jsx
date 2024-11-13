import {useState, useEffect} from "react";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import useCustomFetch from "../../../hooks/useCustomFetch.js";
import SkeletonCard from "../../skeleton.jsx";
import useGetMovies from "../../../hooks/queries/useGetMovies.js";
import {useQuery} from "@tanstack/react-query"

const UpComingPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/upcoming?language=ko-KR&page=1`);

    const {data: movies, isPending, isError} = useQuery({
        queryFn: () => useGetMovies({category: 'upcoming', pageParam: 1}),
        queryKey: ['movies', 'upcoming'],
    })
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
    return(
        <MovieContainer>
            {movies?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>                    
            ))}
        </MovieContainer>
    );
};

export default UpComingPage;
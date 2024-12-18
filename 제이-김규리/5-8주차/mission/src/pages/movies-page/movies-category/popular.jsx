import {useState, useEffect} from "react";
import useCustomFetch from "../../../hooks/useCustomFetch.js";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton.jsx";
import useGetMovies from "../../../hooks/queries/useGetMovies.js";
import {useQuery} from "@tanstack/react-query"
import { useGetInfiniteMovies } from "../../../hooks/queries/useGetInfiniteMovies.js";
import {useInView} from "react-intersection-observer";
import ClipLoader from "react-spinners/ClipLoader.js";

const PopularPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/popular?language=ko-KR&page=1`);

    /* const {data: movies, isPending, isError} = useQuery({
        queryFn: () => useGetMovies({category: 'popular', pageParam: 1}),
        queryKey: ['movies', 'popular'],
    }) */

    const {
        data: movies, 
        isLoading, 
        isFetching, 
        hasNextPage, 
        isPending, 
        fetchNextPage, 
        isFetchingNextPage,
        error,
        isError
    } = useGetInfiniteMovies('popular');

    const {ref, inView} = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if(inView){
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage])

        if(isPending){
            return (
                <MovieContainer>
                    {[...Array(20)].map((_, idx) => (
                        <SkeletonCard key={idx} />
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
        <>
        <MovieContainer>
        {/*  {movies?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))} */}

            {movies?.pages.map((page) => {
                return page.results.map((movie, _) => {
                    return <MovieCard movie={movie} key={movie.id}/>
                })
            })}
            {isFetching && (
                 <MovieContainer>
                    {[...Array(5)].map((_, idx) => (
                        <SkeletonCard key={idx} />
                    ))}
                </MovieContainer>
            )}
        </MovieContainer>
        <div ref={ref} style={{marginTop: '50px', display: 'flex', justifyContent: 'center', width: '100%'}}>
            {isFetching && <ClipLoader color={'#fff'}/>}
        </div>
    </>
    );
}

export default PopularPage;
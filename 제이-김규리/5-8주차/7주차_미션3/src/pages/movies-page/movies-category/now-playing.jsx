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
import PaginationButton from "../../../components/pagination-button.js";

const NowPlayingPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/now_playing?language=ko-KR&page=1`);

    /* const {data: movies, isPending, isError} = useQuery({
        queryFn: () => useGetMovies({category: 'now_playing', pageParam: 1}),
        queryKey: ['movies', 'now_playing'], 
    }) */
    //console.log(movies.results);

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
    } = useGetInfiniteMovies('now_playing');
    
    // 특정 요소가 화면에 들어오면 inView값이 true가 됨
    // ref는 감지하고 싶은 요소에 연결한다.
    const {ref, inView} = useInView({
        threshold: 0,
    });

    useEffect(() => {
        // ClipLoader가 돌아갈 때 다음 페이지가 로드됨
        if(inView){
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage])
    // isPending: 데이터를 불러오는 중, 데이터가 로딩중일때 isPending true
    // isLoading: 데이터를 불러오는 중이거나, 재시도 중 일때 true가 됨
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
    //console.log(movies.data);
    return (
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


            {/* ref를 이 div에 연결하여 ClipLoader가 화면에 보일 때 inView가 true가 됨 */}
            <div ref={ref} style={{marginTop: '50px', display: 'flex', justifyContent: 'center', width: '100%'}}>
                {isFetching && <ClipLoader color={'#fff'}/>}
            </div>
        </>
    );
}

export default NowPlayingPage;
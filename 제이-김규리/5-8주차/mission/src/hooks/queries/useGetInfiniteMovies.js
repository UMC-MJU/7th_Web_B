import {useInfiniteQuery} from "@tanstack/react-query";
import useGetMovies from "./useGetMovies";

function useGetInfiniteMovies(category){
    return useInfiniteQuery({
        
        // 데이터 가져오는 함수
        // pageParam은 useInfiniteQuery에서 자동으로 관리해준다.
        queryFn: ({pageParam}) => useGetMovies({category, pageParam}),
        
        // 쿼리 키 설정
        queryKey: ['movies', category],

        // 초기 페이지 설정
        initialPageParam: 1,

        // 다음 페이지 설정
        getNextPageParam: (lastPage, allPages) => {
            //const lastMovie = lastPage.results[lastPage.results.length-1];  // 마지막 영화

            //console.log("lastPage", lastPage)
            //console.log("allPages", allPages)
            const lastMovie = lastPage.results.at(-1);
            
            return lastMovie ? allPages?.length+1 : undefined;
        }
    })
}

export {useGetInfiniteMovies}
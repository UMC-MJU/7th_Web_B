import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton.jsx";
import PaginationButton from "../../../components/pagination-button.js";
import axiosInstance from "../../../apis/axios-instance.js";

const useGetTrending = async ({ pageParam }) => {
    const { data } = await axiosInstance.get(`/trending/movie/day?language=ko-KR&page=${pageParam}`);
    return data;
};
const TrendingPage = () => {
    const [page, setPage] = useState(1);

    const {
        data: movies,
        isPending,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryFn: () => useGetTrending({ pageParam: page }),
        queryKey: ["movies", "trending", page],
        keepPreviousData: true, // 페이지 전환 시 이전 데이터 유지
    });

    const handlePrevious = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));  // 최소 1페이지 유지
    };

    const handleNext = () => {
        if (movies && movies.total_pages > page) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isPending) {
        return (
            <MovieContainer>
                {[...Array(20)].map((_, idx) => (
                    <SkeletonCard key={idx} />
                ))}
            </MovieContainer>
        );
    }

    if (isError) {
        return (
            <div>
                <h1 style={{ color: 'white' }}>에러 발생: {error.message}</h1>
            </div>
        );
    }

    return (
        <>
            <MovieContainer>
                {movies?.results.map((movie) => (
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
                <PaginationButton onClick={handlePrevious} disabled={page === 1 || isFetching}>
                    이전
                </PaginationButton>
                <span style={{ color: 'white', fontSize: '18px', padding: '0 10px' }}>{page} 페이지</span>
                <PaginationButton
                    onClick={handleNext}
                    disabled={movies?.total_pages <= page || isFetching}
                >
                    다음
                </PaginationButton>
            </div>
        </>
    );
}

export default TrendingPage;
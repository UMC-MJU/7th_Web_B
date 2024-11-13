import React, { useState } from "react";
import * as S from "./search.style";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import MovieContainer from "../../components/custom-movie/movie-container";
import MovieCard from "../../components/custom-movie/movie-card";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const onChangeSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    const [searchParams, setSearchParams] = useSearchParams({ 
        mq: ''
    });

    const mq = searchParams.get('mq');

    const handleSearchMovie = () => {
        if(mq === searchQuery) return;  // 똑같은 검색어로 검색 버튼을 연속으로 누르면 데이터를 받아오지 않도록
        navigate(`/search?mq=${searchQuery}`)
    }
    //console.log(searchQuery);

    const handleSearchMovieWithKeyboard = (event) => {
        if(event.key === 'Enter'){
            handleSearchMovie();
        }
    }

    const url = `/search/movie?query=${searchQuery}&include_adult=false&language=ko-KR&page=1`;
    const {data: movies, isLoading, isError} = useCustomFetch(url);
    console.log(movies);

    return(
        <>
            <S.SearchContainer>
                <S.SearchInput
                    placeholder="영화 제목을 입력해주세요."
                    value={searchQuery}    
                    onChange={onChangeSearchQuery}
                    onKeyDown={handleSearchMovieWithKeyboard}
                />
                <S.SearchButton onClick={handleSearchMovie}>검색</S.SearchButton>
            </S.SearchContainer>
            <MovieContainer>
                {movies?.data?.results?.length > 0 ? (
                    movies.data.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    searchQuery ? (
                        <p style={{ color: "white", fontSize: 25, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
                            {`해당하는 검색어 "${searchQuery}"에`} <br /> {`해당하는 데이터가 없습니다.`}
                        </p>

                    ) : null
                )}
            </MovieContainer>
        </>
    );
}
export default Search;
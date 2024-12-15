import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import * as S from "./search.style";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import MovieContainer from "../../components/custom-movie/movie-container";
import MovieCard from "../../components/custom-movie/movie-card";

interface Movie {
  id: number;
  [key: string]: any; // Define additional properties dynamically
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const onChangeSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const [searchParams] = useSearchParams({
    mq: "",
  });

  const mq = searchParams.get("mq");

  const handleSearchMovie = () => {
    if (mq === searchQuery) return; // Avoid redundant requests for the same query
    navigate(`/search?mq=${searchQuery}`);
  };

  const handleSearchMovieWithKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchMovie();
    }
  };

  const url = `/search/movie?query=${searchQuery}&include_adult=false&language=ko-KR&page=1`;
  const { data: movies, isLoading, isError } = useCustomFetch<{ data: { results: Movie[] } }>(url);

  return (
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
          movies.data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : searchQuery ? (
          <p
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            {`해당하는 검색어 "${searchQuery}"에`} <br /> {`해당하는 데이터가 없습니다.`}
          </p>
        ) : null}
      </MovieContainer>
    </>
  );
};

export default Search;

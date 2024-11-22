import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieList from "./FrameComponent/MovieList";
import Card from "./FrameComponent/Card";
import CardSkeleton from "./SkeletonUI/CardSkeleton";

const FindPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 처음 검색 페이지에 들어왔을 때부터 오류메세지가 뜨는걸 방지
  const navigate = useNavigate();

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams({
    mq: "",
  });

  const mq = searchParams.get("mq");

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    navigate(`/find?mq=${searchValue}`); // router에는 /find만 설정해놓았기 때문에 뒤에 어떤게 붙어도 /find까지만 인식
    setErrorMessage(
      // 오류문에 변수로 mq를 넣게 되면 오류메세지가 한턴씩 밀려서 나옴.
      `해당하는 검색어 ${searchValue}에 해당하는 데이터가 없습니다.`
    );
    console.log("hi");
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  /**searchValue값을 넣으면 input 값이 바뀔때마다 화면이 바뀌므로 검색 버튼의 의미가 없어짐
   * 따라서 mq값을 넣어 검색 버튼을 눌렀을 시 화면이 바뀌도록 하여 UX적으로 나아지도록 함.
   */
  const url = `/search/movie?query=${mq}&include_adult=false&language=ko&page=1`;
  const { data: movies, isLoading, isError } = useCustomFetch(url); // url이 바뀌지 않으면 useCustomFetch도 발동 x

  return (
    <Screen>
      <Search>
        <SearchBox>
          <SearchInput
            placeholder="영화 제목을 입력해주세요..."
            value={searchValue}
            onChange={onChangeSearchValue}
            onKeyDown={handleSearchMovieWithKeyboard}
          />
          <SearchButton onClick={handleSearchMovie}>검색</SearchButton>
        </SearchBox>
      </Search>
      {isLoading ? (
        <MovieList>
          {Array.from({ length: 18 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </MovieList>
      ) : !isError && movies?.data?.results.length ? (
        <MovieList>
          {movies.data?.results.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
        </MovieList>
      ) : (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </Screen>
  );
};

export default FindPage;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Search = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const SearchBox = styled.div`
  display: flex;
`;
const SearchInput = styled.input`
  height: 40px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid rgb(220, 220, 2);
  width: 700px;
`;

const SearchButton = styled.button`
  width: 80px;
  color: white;
  background-color: rgb(227, 62, 90);
  cursor: pointer;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: white;
  text-align: center;
`;

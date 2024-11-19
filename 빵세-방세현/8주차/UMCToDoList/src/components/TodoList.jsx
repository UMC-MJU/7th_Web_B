import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ListSpace from "../components/ListSpace";
import searchDebounce from "../debounce/searchDebounce";
import { useQuery } from "@tanstack/react-query";
import { useGetTodo } from "../queries/useGetTodo";
import axiosInstance from "../api/axiosInstance";
import LoadingAni from "../animation/loadingAni";
import ErrorAni from "../animation/errorAni";
import backgroundImg from "../assets/images/note.jpeg";
import { IoSearch } from "react-icons/io5";
import { FaBookBookmark } from "react-icons/fa6";

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");
  const debouncedSearchText = searchDebounce(search, 300); // debounce 구현

  // todo 데이터 받아오기
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["todos", debouncedSearchText], // queryKey는 search 텍스트와 연결
    queryFn: () => useGetTodo(debouncedSearchText), // debouncedSearchText를 그대로 전달
    enabled: !!debouncedSearchText || debouncedSearchText === "", // 검색어가 없을 때도 전체 데이터 요청
    onError: (error) => {
      console.error("TodoList를 불러오는 데 실패했습니다", error);
      handleError(); // 기존 에러 핸들러
    },
  });
  console.log(data);

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  // 새 리스트 추가 함수
  const addTodo = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    const newTodo = {
      title: title,
      content: content,
    };
    try {
      const response = await axiosInstance.post("", newTodo);
      console.log("Response:", response); // 응답 출력

      if (response.status === 201) {
        console.log("Todo added successfully:");
        // 성공적으로 추가된 후 입력 필드 초기화

        refetch(); // 데이터를 다시 불러옴.
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      handleError();
    }
  };

  // 검색어가 변경되면 refetch 호출
  useEffect(() => {
    refetch();
  }, [debouncedSearchText]); // debouncedSearchText 변경 시마다 실행됨

  console.log(data);
  return (
    <Screen>
      <TitleBox>
        <BookIcon />
        <Title>UMC ToDoList</Title>
      </TitleBox>

      <Form onSubmit={addTodo}>
        <SearchBox>
          <SearchIcon />
          <Search
            placeholder="제목 검색"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Search>
        </SearchBox>
        <Write>글 작성</Write>
        <TitleInput
          placeholder="제목을 입력해주세요"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TitleInput>
        <ContentInput
          placeholder="내용을 입력해주세요."
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></ContentInput>
        <SubmitButton type="submit">ToDo 생성</SubmitButton>
      </Form>
      {isLoading ? (
        <LoadingAni />
      ) : isError ? (
        <ErrorAni />
      ) : (
        <ListSpace todos={data} />
      )}
    </Screen>
  );
};

export default TodoList;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; // 가로 크기 100%
  height: 100vh; // 세로 크기 100%
  overflow-y: auto; // 세로 스크롤 가능
  background-image: url(${backgroundImg}); // 이미지 파일을 변수로 사용
  background-size: auto;
  font-family: SejongGeulggot;
`;

const TitleBox = styled.div`
  display: flex;
`;
const Title = styled.h1`
  color: black;
  font-size: 60px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const SearchBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Search = styled.input`
  width: 150px;
  height: 25px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 5px;
`;

const TitleInput = styled.input`
  width: 400px;
  height: 30px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 5px;
`;

const ContentInput = styled.textarea`
  width: 400px;
  height: 150px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  margin-bottom: 30px;
  background-color: rgb(116, 195, 136);
`;

const SearchIcon = styled(IoSearch)`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

const BookIcon = styled(FaBookBookmark)`
  width: 45px;
  height: 45px;
  color: green;
  padding-top: 50px;
  margin-right: 10px;
`;

const Write = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

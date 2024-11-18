import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ListSpace from "../components/ListSpace";
import searchDebounce from "../debounce/searchDebounce";
import axiosInstance from "../api/axiosInstance";
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");
  const debouncedSearchText = searchDebounce(search, 300); // debounce 구현

  // todo 데이터 받아오는 함수
  const getTodo = async (queryParams = {}) => {
    try {
      const datas = await axiosInstance.get("", {
        params: queryParams,
      });
      console.log(datas);
      if (datas.status === 200) {
        setTodos(datas.data[0]);
      }
    } catch (error) {
      console.error("TodoList를 불러오는 데 실패했습니다", error);
    }
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

        getTodo();
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // 검색어가 변경되면 getTodo 호출
  useEffect(() => {
    if (debouncedSearchText) {
      // 검색어가 있으면 필터링된 데이터를 가져옴
      getTodo({ title: debouncedSearchText });
    } else {
      // 검색어가 없으면 전체 데이터를 가져옴
      getTodo();
    }
  }, [debouncedSearchText]); // debouncedSearchText 변경 시마다 실행됨

  console.log(todos);
  return (
    <Screen>
      <Title>UMC ToDoList</Title>
      <Form onSubmit={addTodo}>
        <Search
          placeholder="제목 검색"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Search>
        <TitleInput
          placeholder="제목을 입력해주세요"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TitleInput>
        <ContentInput
          placeholder="내용을 입력해주세요"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></ContentInput>
        <SubmitButton type="submit">ToDo 생성</SubmitButton>
      </Form>
      <ListSpace todos={todos} getTodo={getTodo} />
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
`;

const Title = styled.h1`
  color: black;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const Search = styled.input`
  width: 150px;
  height: 25px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const TitleInput = styled.input`
  width: 400px;
  height: 30px;
  margin-bottom: 10px;
`;

const ContentInput = styled.input`
  width: 400px;
  height: 30px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  margin-bottom: 30px;
`;

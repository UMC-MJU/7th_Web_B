import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { deleteTodos, editTodos, editCheckbox } from "../queries/toMutate";

const ListSpace = ({ todos }) => {
  const navigate = useNavigate();

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const QueryClient = useQueryClient();

  // 삭제
  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: (id) => deleteTodos(id),
    onSuccess: (response) => {
      console.log("삭제 성공,", response);
      QueryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("삭제 실패,", error);
    },
  });

  // 수정 전 기존 내용들을 유지하기 위함
  const setEditTodos = (id, title, content) => {
    setEditId(id);
    // 수정하기 전 미리 기존의 제목과 내용을 수정할 useState에 담아줌으로써 기존의 내용을 유지.
    setEditTitle(title);
    setEditContent(content);
  };

  // 수정
  const { mutate: editTodoMutation } = useMutation({
    // mutationFn은 단일 인자를 받는 함수여야 하므로 여러 인자를 전달할 때는 하나의 객체로 전달
    mutationFn: ({ id, title, content }) => editTodos(id, title, content),
    onSuccess: (response) => {
      console.log("수정 성공,", response);
      QueryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      setEditId("");
    },
    onError: (error) => {
      console.error("수정 실패,", error);
    },
  });

  // 상세 페이지 이동 함수
  const handleClickTodo = (id) => {
    navigate(`/todo/${id}`);
  };

  //체크 상태 수정 함수
  const { mutate: editCheckboxMutation } = useMutation({
    // mutationFn은 단일 인자를 받는 함수여야 하므로 여러 인자를 전달할 때는 하나의 객체로 전달 (매우 중요하다고 느낌.)
    mutationFn: ({ id, checkState }) => editCheckbox(id, checkState),
    onSuccess: (response) => {
      console.log("체크박스 수정 성공,", response);
      QueryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("체크박스 수정 실패,", error);
    },
  });

  return (
    <TotalList>
      {todos?.map((todo) => (
        <EachList key={todo.id}>
          <CheckInput
            type="checkbox"
            checked={todo.checked}
            onChange={() =>
              editCheckboxMutation({ id: todo.id, checkState: todo.checked })
            }
          ></CheckInput>
          {editId === todo.id ? (
            <TitleAndContent>
              <EditTitle
                placeholder="제목 수정"
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                }}
              ></EditTitle>
              <EditContent
                placeholder="내용 수정"
                value={editContent}
                onChange={(e) => {
                  setEditContent(e.target.value);
                }}
              ></EditContent>
            </TitleAndContent>
          ) : (
            <TitleAndContent onClick={() => handleClickTodo(todo.id)}>
              <Title>{todo.title}</Title>
              <Content>{todo.content}</Content>
            </TitleAndContent>
          )}
          {editId === todo.id ? (
            <ButtonBox>
              <EditComplete
                onClick={() => {
                  editTodoMutation({
                    id: editId,
                    title: editTitle,
                    content: editContent,
                  }); // mutationFn이 기대하는 매개변수는 객체이므로 동일한 구조로 보내주어야 함.
                }}
              >
                수정완료
              </EditComplete>
            </ButtonBox>
          ) : (
            <ButtonBox>
              <EditButton
                onClick={() => setEditTodos(todo.id, todo.title, todo.content)}
              >
                수정
              </EditButton>
              <DeleteButton onClick={() => deleteTodoMutation(todo.id)}>
                삭제
              </DeleteButton>
            </ButtonBox>
          )}
        </EachList>
      ))}
    </TotalList>
  );
};

export default ListSpace;

const TotalList = styled.div`
  display: flex;
  flex-direction: column;
`;
const EachList = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 450px;
  height: 80px;
  background-color: white;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const TitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 200px;
  height: 25px;
  margin-bottom: 5px;
  padding-left: 5px;
`;

const Content = styled.div`
  width: 200px;
  height: 25px;
  padding-left: 5px;
`;

const ButtonBox = styled.div`
  margin-left: 40px;
  background-color: white;
`;

const EditButton = styled.button`
  margin-right: 10px;
  background-color: pink;
  border: 1px solid black;
`;

const DeleteButton = styled.button`
  background-color: pink;
  border: 1px solid black;
`;

const CheckInput = styled.input`
  margin-right: 25px;
`;

const EditTitle = styled.input`
  margin-bottom: 8px;
  width: 200px;
`;

const EditContent = styled.textarea``;

const EditComplete = styled.button`
  background-color: rgb(116, 195, 136);
  margin-left: 25px;
`;

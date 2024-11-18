import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
const ParticularPage = () => {
  const { id } = useParams();

  // 상세 페이지의 제목, 내용, 업데이트 날짜, 수행 여부 받을 useState 변수 선언
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [checked, setChecked] = useState(false);

  //수정 id
  const [editId, setEditId] = useState("");

  // 수정 완료 시 patch할 useState 데이터 선언
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editChecked, setEditChecked] = useState(false);

  // 상세페이지 데이터 불러오는 함수
  const getParticularData = async () => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      if (response.status === 200) {
        console.log("상세 페이지 불러오기 성공");
        console.log(response);
        setTitle(response.data.title);
        setContent(response.data.content);

        // 날짜 형식 수정
        const formattedDate = new Date(response.data.updatedAt)
          .toISOString()
          .split("T")[0];
        setDate(formattedDate);
        setChecked(response.data.checked);
      }
    } catch (error) {
      console.error("상세 페이지 불러오기 실패", error);
    }
  };

  useEffect(() => {
    getParticularData();
  }, [id]);

  // 수정 전 기존 내용들을 유지하기 위함
  const setEditTodos = (id, title, content, checked) => {
    setEditId(id);
    // 수정하기 전 미리 기존의 제목과 내용을 수정할 useState에 담아줌으로써 기존의 내용을 유지.
    setEditTitle(title);
    setEditContent(content);
    setEditChecked(checked);
  };

  // 삭제 함수
  const deleteTodos = async (id) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      console.log(response);
      getParticularData();
    } catch (error) {
      console.error("TodoList를 삭제하는 데 실패했습니다", error);
    }
  };

  // 수정 함수 (상세 페이지의 경우 체크 여부까지 함께 보내도록 구현)
  const editTodos = async (id) => {
    try {
      const response = await axiosInstance.patch(`/${id}`, {
        title: editTitle,
        content: editContent,
        checked: editChecked,
      });
      console.log(response);
      if (response.status === 200) {
        console.log("Todo patched successfully:");
        setEditId("");
        getParticularData();
      }
    } catch (error) {
      console.error("수정에 실패하였습니다.", error);
    }
  };

  const handleCheckbox = (checked) => {
    setChecked(!checked); // ui 즉시 변환을 위해
    setEditChecked(!checked); // 수정할 때 보낼 체크 데이터 설정
  };

  return (
    <Screen>
      <Title>UMC ToDoList</Title>
      <h2>Post Id:{id}</h2>
      {editId === id ? (
        <Contents>
          <EditTitle
            placeholder="제목 수정"
            defaultValue={title}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          ></EditTitle>
          <EditContent
            placeholder="내용 수정"
            defaultValue={content}
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
          ></EditContent>
          <EachContent>업데이트: {date}</EachContent>
          <CheckBox>
            <div>상태:</div>
            <CheckInput
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckbox(checked)}
            ></CheckInput>
          </CheckBox>
        </Contents>
      ) : (
        <Contents>
          <EachContent>제목: {title}</EachContent>
          <EachContent>내용: {content}</EachContent>
          <EachContent>업데이트: {date}</EachContent>
          <EachContent>
            상태: {checked === true ? "완료" : "미완료"}
          </EachContent>
        </Contents>
      )}
      {editId === id ? (
        <ButtonBox>
          <button onClick={() => editTodos(editId)}>수정완료</button>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <EditButton onClick={() => setEditTodos(id, title, content, checked)}>
            수정
          </EditButton>
          <DeleteButton onClick={() => deleteTodos(id)}>삭제</DeleteButton>
        </ButtonBox>
      )}
    </Screen>
  );
};

export default ParticularPage;

const Title = styled.h1`
  color: black;
  text-align: center;
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; // 가로 크기 100%
  height: 100vh; // 세로 크기 100%
  overflow-y: auto; // 세로 스크롤 가능
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const EachContent = styled.div`
  margin-bottom: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  margin-right: 10px;
  background-color: pink;
`;

const DeleteButton = styled.button`
  background-color: pink;
`;

const CheckBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const CheckInput = styled.input`
  margin-left: 15px;
`;

const EditTitle = styled.input`
  margin-bottom: 10px;
`;

const EditContent = styled.input`
  margin-bottom: 10px;
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useGetParticularTodo } from "../queries/useGetParticularTodo";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import backgroundImg from "../assets/images/note.jpeg";
import { useNavigate } from "react-router-dom";
import { FaBookBookmark } from "react-icons/fa6";
import { deletePartPage, editPartTodos } from "../queries/toMutate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ParticularPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const QueryClient = useQueryClient();

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
  const { data, refetch } = useQuery({
    queryKey: ["particulartodos", id],
    queryFn: () => useGetParticularTodo(id),
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setDate(new Date(data.updatedAt).toISOString().split("T")[0]);
      setChecked(data.checked);
    }
  }, [data]);

  useEffect(() => {
    refetch();
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
  const { mutate: deletePartMutation } = useMutation({
    // mutationFn은 단일 인자를 받는 함수여야 하므로 여러 인자를 전달할 때는 하나의 객체로 전달
    mutationFn: (id) => deletePartPage(id),
    onSuccess: (response) => {
      console.log("상세페이지 삭제 성공,", response);
      QueryClient.invalidateQueries({
        queryKey: ["particularpage", id],
      });
      navigate("/");
    },
    onError: (error) => {
      console.error("상세페이지 삭제 실패,", error);
    },
  });

  // 수정 함수 (상세 페이지의 경우 체크 여부까지 함께 보내도록 구현)
  const { mutate: editPartMutation } = useMutation({
    // mutationFn은 단일 인자를 받는 함수여야 하므로 여러 인자를 전달할 때는 하나의 객체로 전달
    mutationFn: ({ id, editTitle, editContent, editChecked }) =>
      editPartTodos(id, editTitle, editContent, editChecked),
    onSuccess: (response) => {
      console.log("상세페이지 수정 성공,", response);
      QueryClient.invalidateQueries({
        queryKey: ["particulartodos", id], // 상세페이지의 queryKey로 수행해야 함.
      });
      setEditId("");
    },
    onError: (error) => {
      console.error("상세페이지 수정 실패,", error);
    },
  });

  const handleCheckbox = (checked) => {
    setChecked(!checked); // ui 즉시 변환을 위해
    setEditChecked(!checked); // 수정할 때 보낼 체크 데이터 설정
  };

  return (
    <Screen>
      <TitleBox>
        <BookIcon />
        <Title>UMC ToDoList</Title>
      </TitleBox>
      <h2>Post Id:{id}</h2>
      {editId === id ? (
        <Contents>
          <TitleEditBox>
            <div>제목: </div>
            <EditTitle
              placeholder="제목 수정"
              defaultValue={title}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            ></EditTitle>
          </TitleEditBox>
          <ContentEditBox>
            <div>내용:</div>
            <EditContent
              placeholder="내용 수정"
              defaultValue={content}
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            ></EditContent>
          </ContentEditBox>
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
          <EditComplete
            onClick={() =>
              editPartMutation({
                id: editId,
                editTitle: editTitle,
                editContent: editContent,
                editChecked: editChecked,
              })
            }
          >
            수정완료
          </EditComplete>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <EditButton onClick={() => setEditTodos(id, title, content, checked)}>
            수정
          </EditButton>
          <DeleteButton onClick={() => deletePartMutation(id)}>
            삭제
          </DeleteButton>
        </ButtonBox>
      )}
    </Screen>
  );
};

export default ParticularPage;

const TitleBox = styled.div`
  display: flex;
`;

const Title = styled.h1`
  color: black;
  text-align: center;
  font-size: 60px;
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; // 가로 크기 100%
  height: 100vh; // 세로 크기 100%
  overflow-y: auto; // 세로 스크롤 가능
  background-image: url(${backgroundImg}); // 이미지 파일을 변수로 사용
  font-family: SejongGeulggot;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 500px;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  padding: 50px;
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
  border: 1px solid black;
`;

const DeleteButton = styled.button`
  background-color: pink;
  border: 1px solid black;
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
  width: 300px;
  margin-left: 10px;
`;

const EditContent = styled.textarea`
  margin-bottom: 10px;
  width: 300px;
  margin-left: 10px;
`;

const TitleEditBox = styled.div`
  display: flex;
`;

const ContentEditBox = styled.div`
  display: flex;
`;

const BookIcon = styled(FaBookBookmark)`
  width: 45px;
  height: 45px;
  color: green;
  padding-top: 50px;
  margin-right: 10px;
`;
const EditComplete = styled.button`
  background-color: rgb(116, 195, 136);
  border: 1px solid black;
`;

import React from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";

const LogInPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };
  return (
    <Screen>
      <PullForm>
        <LoginTitle>로그인</LoginTitle>
        <EmailInput
          type={"email"}
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
        />
        <PasswordInput
          type={"password"}
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
        />
        <SubmitButton type={"submit"} />
      </PullForm>
    </Screen>
  );
};

export default LogInPage;

const Screen = styled.div`
  width : 100%
text-align : center;
margin : 0 auto;
`;

const PullForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  justify-content: center;
  align-items: center;
`;
const LoginTitle = styled.h1`
  color: white;
  margin-bottom: 30px;
`;
const EmailInput = styled.input`
  width: 220px;
  height: 35px;
  padding-left: 5px; // placeholder 위치 조정
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
`;
const PasswordInput = styled.input`
  width: 220px;
  height: 35px;
  padding-left: 5px; // placeholder 위치 조정
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.input`
  width: 230px; // padding값 10 추가해서 크기 맞춰줌
  height: 35px;
  background-color: rgb(227, 62, 90);
  color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

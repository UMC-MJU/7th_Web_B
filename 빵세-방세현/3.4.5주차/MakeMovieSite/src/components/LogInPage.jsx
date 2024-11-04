import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "../hooks/use-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { validateLogin } from "../utils/validate";

const LogInPage = () => {
  const navigate = useNavigate();

  const login = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handlePressLogin = async (event) => {
    event.preventDefault(); // 폼 기본 제출 방지
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: login.values.email, // use-form의 return값들 참고
        password: login.values.password,
      });
      localStorage.clear();
      localStorage.setItem("id", login.values.email); // 이메일 저장 (회원 이름으로 사용)
      localStorage.setItem("token", response.data); // access / refresh 토큰 저장
      navigate("/movie"); // 영화페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <Screen>
      <Form onSubmit={handlePressLogin}>
        <LoginMsg>로그인 페이지</LoginMsg>;
        <Input
          error={login.errors.email && login.touched.email}
          type={"email"}
          placeholder={"이메일을 입력해주세요"}
          {...login.getTextInputProps("email")}
        />
        {login.errors.email && login.touched.email && (
          <ErrorText>{login.errors.email}</ErrorText>
        )}
        <Input
          error={login.errors.password && login.touched.password}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요"}
          {...login.getTextInputProps("password")}
        />
        {login.errors.password && login.touched.password && (
          <ErrorText>{login.errors.password}</ErrorText>
        )}
        <SubmitButton>로그인</SubmitButton>
      </Form>
    </Screen>
  );
};

export default LogInPage;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; // 전체 가로 너비를 차지
  margin: 0 auto; // 수평 방향 여백을 자동으로 설저해서 수평 가운데 정렬이 됨.
`;
const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;

  border: ${(props) => (props.error ? "4px solid red" : "1px solid #ccc")};

  &:focus {
    border-color: #007bff;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;
const LoginMsg = styled.h2`
  color: white;
`;

const SubmitButton = styled.button`
  margin: 10px 0;
  padding: 8px;
  width: 318px;
  border: 1px solid black;
  border-radius: 4px;
  color: white;
  background-color: rgb(227, 62, 90);
`;

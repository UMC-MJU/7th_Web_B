import React, { useState, useEffect } from "react";
import { useForm } from "../hooks/use-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { validateLogin } from "../utils/validate";

// 35:54
const LogInPage = () => {
  const login = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });
  4;

  const handlePressLogin = () => {
    console.log(login.values.email, login.values.password);
  };
  return (
    <Container>
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
      <button onClick={handlePressLogin}>로그인</button>
    </Container>
  );
};

export default LogInPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;

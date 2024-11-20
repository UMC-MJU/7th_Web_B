import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import schema from "../schema/SignupSchema";
import { useMutation } from "@tanstack/react-query";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordCheck: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // mode 설정을 통해서 입력 중에도 유효성 검사를 실시
  });

  const handleBlur = (name) => {
    setTouched({
      ...touched, // 기존 상태 유지
      [name]: true,
    });
  };

  const { mutate: submitSignUp } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      return response;
    },
    onSuccess: (response) => {
      console.log("회원가입 성공");
      console.log(response.data);
      navigate("/login");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return (
    <Screen>
      {/*handleSubmit이 onSubmit의 매개변수 안에 자동으로 폼 데이터를 넣어줌. 또, 유효성 검사 불통과 시 submit 차단*/}
      <Form onSubmit={handleSubmit(submitSignUp)}>
        <SignupMsg>회원가입 페이지</SignupMsg>;
        <Input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          onBlur={() => handleBlur("email")}
        ></Input>
        {touched.email && errors.email && (
          <ErrorMsg>{errors.email.message}</ErrorMsg>
        )}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          onBlur={() => handleBlur("password")}
        ></Input>
        {touched.password && errors.password && (
          <ErrorMsg>{errors.password.message}</ErrorMsg>
        )}
        <Input
          type="passwordCheck"
          placeholder="비밀번호를 다시 입력해주세요!"
          {...register("passwordCheck")}
          onBlur={() => handleBlur("passwordCheck")}
        ></Input>
        {touched.passwordCheck && errors.passwordCheck && (
          <ErrorMsg>{errors.passwordCheck.message}</ErrorMsg>
        )}
        <SubmitButton>제출</SubmitButton>
      </Form>
    </Screen>
  );
};

export default SignUpPage;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; // 전체 가로 너비를 차지
  margin: 0 auto; // 수평 방향 여백을 자동으로 설저해서 수평 가운데 정렬이 됨.
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const SignupMsg = styled.h2`
  color: white;
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

const SubmitButton = styled.button`
  margin: 10px 0;
  padding: 8px;
  width: 318px;
  border: 1px solid black;
  border-radius: 4px;
  color: white;
  background-color: rgb(227, 62, 90);
`;

const ErrorMsg = styled.p`
  color: white;
`;

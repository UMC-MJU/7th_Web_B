import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styled from "styled-components";

const SignUpPage = () => {
  const [touchEmail, setTouchEmail] = useState(false);
  const [touchPassword, setTouchPassword] = useState(false);
  const [touchPWCheck, setTouchPWCheck] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("검증된 이메일을 입력해주세요.")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 반드시 입력해주세요."),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 다릅니다.") // 다른 input의 입력값과 일치하는지 비교
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 반드시 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // mode 설정을 통해서 입력 중에도 유효성 검사를 실시
  });

  const onBlurEmail = () => {
    setTouchEmail(true);
  };
  const onBlurPassword = () => {
    setTouchPassword(true);
  };
  const onBlurPWCheck = () => {
    setTouchPWCheck(true);
  };

  const onSubmit = (data) => {
    // data는
    console.log("제출된 데이터", data);
  };

  return (
    <Screen>
      {/*handleSubmit이 onSubmit의 매개변수 안에 자동으로 폼 데이터를 넣어줌. */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignupMsg>회원가입 페이지</SignupMsg>;
        <Input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          onBlur={onBlurEmail}
        ></Input>
        {touchEmail && errors.email && (
          <ErrorMsg>{errors.email.message}</ErrorMsg>
        )}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          onBlur={onBlurPassword}
        ></Input>
        {touchPassword && errors.password && (
          <ErrorMsg>{errors.password.message}</ErrorMsg>
        )}
        <Input
          type="passwordCheck"
          placeholder="비밀번호를 다시 입력해주세요!"
          {...register("passwordCheck")}
          onBlur={onBlurPWCheck}
        ></Input>
        {touchPWCheck && errors.passwordCheck && (
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

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

const LogInPage = () => {
  const [isEmailClick, setEmailClick] = useState(false);
  const [isPasswordClick, setPasswordClick] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };

  return (
    <Screen>
      <PullForm onSubmit={handleSubmit(onSubmit)}>
        <LoginTitle>로그인</LoginTitle>
        <EmailInput
          type={"email"}
          placeholder="이메일을 입력해주세요!"
          onFocus={() => setEmailClick(true)}
          onBlur={() => setEmailClick(false)}
          {...register("email")}
        />
        {isEmailClick && errors.email && (
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        )}
        <PasswordInput
          type={"password"}
          placeholder="비밀번호를 입력해주세요!"
          onFocus={() => setPasswordClick(true)}
          onBlur={() => setPasswordClick(false)}
          {...register("password")}
        />
        {isPasswordClick &&
          errors.password && ( // 이렇게 적용했을 때, input의 focus 해제 시, error 문구가 사라지는걸 원했는데, 사라지지는 않았음.
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          )}
        {isValid ? ( // isValid를 통해 폼의 모든 필드가 유효한 상태인지 체크
          <SubmitButton type={"submit"} disabled={!isValid} /> // 유효할 시, disabled는 false로 적용
        ) : (
          <BlockButton type={"submit"} disabled={!isValid} /> // 유효하지 않을 시, disabled는 true로 적용
        )}
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

const BlockButton = styled.input`
  width: 230px; // padding값 10 추가해서 크기 맞춰줌
  height: 35px;
  background-color: gray;
  color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

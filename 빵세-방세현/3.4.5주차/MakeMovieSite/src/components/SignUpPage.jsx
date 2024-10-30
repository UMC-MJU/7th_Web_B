import React from "react";
import styled from "styled-components";

const SignUpPage = () => {
  return (
    <Screen>
      <SignupMsg>회원가입 페이지</SignupMsg>;
      <Input type-="email" placeholder="이메일을 입력해주세요!"></Input>
      <Input type-="password" placeholder="비밀번호를 입력해주세요!"></Input>
      <Input type-="email" placeholder="비밀번호를 다시 입력해주세요!"></Input>
      <SubmitButton>제출</SubmitButton>
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

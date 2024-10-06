import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 import 추가
import styled from "styled-components";

const ApproachNavbar = () => {
  return (
    <TopContainer>
      <LogoButton to={"/"}>YONGCHA</LogoButton>
      <Authentication>
        <LoginButton to={"/login"}>로그인</LoginButton>
        <SignUpButton to={"/signup"}>회원가입</SignUpButton>
      </Authentication>
    </TopContainer>
  );
};

export default ApproachNavbar;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(57, 53, 53);
  height: 60px;
`;

const Authentication = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 20px;
`;

const LogoButton = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: rgb(227, 62, 90);
  text-decoration: none; /* 밑줄 제거 */
  margin-left: 15px;
`;

const LoginButton = styled(Link)`
  font-size: 13px;
  text-decoration: none; /* 밑줄 제거 */
  display: flex; /* flex를 사용하여 글씨 중앙 정렬 */
  align-items: center;
  justify-content: center;
  color: white;
  width: 60px;
  height: 30px;
  border: 1px solid rgb(57, 53, 53);
  border-radius: 10px;
  &: hover {
    background-color: rgb(227, 62, 90);
  }
`;

const SignUpButton = styled(Link)`
  font-size: 13px;
  text-decoration: none; /* 밑줄 제거 */
  display: flex; /* flex를 사용하여 글씨 중앙 정렬 */
  align-items: center;
  justify-content: center;
  color: white;
  width: 60px;
  border: 1px solid rgb(57, 53, 53);
  border-radius: 10px;
  &: hover {
    background-color: rgb(227, 62, 90);
  }
`;

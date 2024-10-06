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
`;

const Authentication = styled.div`
  display: flex;
  gap: 10px;
`;

const LogoButton = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: pink;
  text-decoration: none; /* 밑줄 제거 */
`;

const LoginButton = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
`;

const SignUpButton = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
`;

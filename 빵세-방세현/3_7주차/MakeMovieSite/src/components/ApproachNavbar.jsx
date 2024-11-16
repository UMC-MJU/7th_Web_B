import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Link 컴포넌트 import 추가
import styled from "styled-components";

const ApproachNavbar = () => {
  const navigate = useNavigate();

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const userEmail = localStorage.getItem("id");
  const userName = userEmail ? userEmail.split("@")[0] : ""; // @을 기준으로 나누어 앞부분을 유저이름으로 설정

  return (
    <TopContainer>
      <LogoButton to={"/"}>YONGCHA</LogoButton>
      {localStorage.getItem("token") === null ? (
        <Authentication>
          <LoginButton to={"/login"}>로그인</LoginButton>
          <SignUpButton to={"/signup"}>회원가입</SignUpButton>
        </Authentication>
      ) : (
        <Authentication>
          <Guide>{userName}님 반갑습니다.</Guide>
          <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        </Authentication>
      )}
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

const Guide = styled.p`
  color: white;
`;

const LogoutButton = styled.button`
  font-size: 13px;
  display: flex; /* flex를 사용하여 글씨 중앙 정렬 */
  align-items: center;
  justify-content: center;
  color: white;
  width: 60px;
  border: 1px solid rgb(57, 53, 53);
  border-radius: 10px;
  background-color: rgb(227, 62, 90);
`;

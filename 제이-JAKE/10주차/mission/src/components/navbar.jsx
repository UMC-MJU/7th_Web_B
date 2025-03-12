import StyledLink from "./custom-Link";
import StyledNavbarButton from "./custom-NavbarButton";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  margin-bottom: 15px;
`;
const StyledYongchaLink = styled(Link)`
  width: 95px;
  color: #e50914;
  font-size: 1.2em;
  text-decoration: none;
  margin-left: 10px;
  font-weight: 500;
`;
const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;
const StyledText = styled.p`
  color: white;
  font-size: 0.75em;
`;
const Navbar = () => {
  const [email, setEmail] = useState("");
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("유저정보 불러오기 성공:", response.data);
      setEmail(response.data.email);
    } catch (error) {
      console.error("유저정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    if (localStorage.getItem("accessToken")) {
      getUser();
    }
  }, [localStorage.getItem("accessToken")]);
  const handleLogout = () => {
    setEmail("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <StyledNav>
      <StyledYongchaLink to={"/"}>YONGCHA</StyledYongchaLink>
      {email ? (
        <StyledBox>
          <StyledText>{email.split("@")[0]}님 반갑습니다</StyledText>
          <StyledNavbarButton>
            <StyledLink to={"/movies"} onClick={handleLogout}>
              로그아웃
            </StyledLink>
          </StyledNavbarButton>
        </StyledBox>
      ) : (
        <StyledBox>
          <StyledNavbarButton>
            <StyledLink to={"/login"}>로그인</StyledLink>
          </StyledNavbarButton>
          <StyledNavbarButton backgroundColor={"#e7545b"}>
            <StyledLink to={"/sign-up"}>회원가입</StyledLink>
          </StyledNavbarButton>
        </StyledBox>
      )}
    </StyledNav>
  );
};

export default Navbar;

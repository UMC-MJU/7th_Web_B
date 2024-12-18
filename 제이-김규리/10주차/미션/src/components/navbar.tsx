import StyledLink from "./custom-Link";
import StyledNavbarButton from "./custom-NavbarButton";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: auto 90px 90px;
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

const Navbar = () => {
  return (
    <StyledNav>
      <StyledYongchaLink to="/">YONGCHA</StyledYongchaLink>
      <StyledNavbarButton>
        <StyledLink to="/login">로그인</StyledLink>
      </StyledNavbarButton>
      <StyledNavbarButton backgroundColor="#e7545b">
        <StyledLink to="/sign-up">회원가입</StyledLink>
      </StyledNavbarButton>
    </StyledNav>
  );
};

export default Navbar;

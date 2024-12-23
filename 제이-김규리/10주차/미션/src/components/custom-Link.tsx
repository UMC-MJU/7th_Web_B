import { Link } from "react-router-dom";
import styled from "styled-components";

interface StyledLinkProps {
  fontWeight?: string;  // 선택적 속성
}

const StyledLink = styled(Link)<StyledLinkProps>`
  color: white;
  text-decoration: none;
  font-size: 12px;
  font-weight: ${(props) => props.fontWeight || "normal"};
`;

export default StyledLink;

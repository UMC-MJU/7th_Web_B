import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 import 추가
import styled from "styled-components";

const SideBar = () => {
  return (
    <SideContainer>
      <FindButton to={"/find"}>찾기</FindButton>
      <MovieButton to={"/movie"}>영화</MovieButton>
    </SideContainer>
  );
};

export default SideBar;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FindButton = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: white;
`;

const MovieButton = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: white;
`;

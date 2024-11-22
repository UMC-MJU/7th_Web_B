import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 import 추가
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";

const SideBar = () => {
  return (
    <SideContainer>
      <FindButton to={"/find"}>
        <IoSearch />
        찾기
      </FindButton>
      <MovieButton to={"/movie"}>
        <BiCameraMovie />
        영화
      </MovieButton>
    </SideContainer>
  );
};

export default SideBar;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: rgb(57, 53, 53);
  background-color: black;
  width: 200px;
  border-right: 3px outset white;
`;

const FindButton = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: white;
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 25px;
  margin-bottom: 15px;
  margin-left: 30px;
  font-size: 20px;
`;

const MovieButton = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: white;
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: 30px;
  font-size: 20px;
`;

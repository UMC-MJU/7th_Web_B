import React from "react";
import ingImage from "../assets/images/ing.jpg";
import popularImage from "../assets/images/popular.jpeg";
import starImage from "../assets/images/star.png";
import comingsoonImage from "../assets/images/coming-soon.jpg";

import styled from "styled-components";
import CategoryButton from "./CategoryButton";
import { Outlet } from "react-router-dom";

const MoviePage = () => {
  return (
    <Screen>
      <Title>카테코리</Title>
      <CategoryList>
        <CategoryButton src={ingImage} alt="ing" subtitle="현재 상영중인" />
        <CategoryButton src={popularImage} alt="popular" subtitle="인기있는" />
        <CategoryButton
          src={starImage}
          alt="good"
          subtitle="높은 평가를 받은"
        />
        <CategoryButton
          src={comingsoonImage}
          alt="coming"
          subtitle="개봉 예정중인"
        />
      </CategoryList>
      <Outlet />
    </Screen>
  );
};

export default MoviePage;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: white;
  font-size: 35px;
  margin-left: 70px;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const CategoryList = styled.div`
  display: flex;
`;

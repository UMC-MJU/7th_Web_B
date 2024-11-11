import React from "react";
import ingMovie from "../assets/images/ingMovie.jpg";
import popularMovie from "../assets/images/popularMovie.jpg";
import goodMovie from "../assets/images/goodMovie.jpg";
import comingsoonMovie from "../assets/images/comingMovie.jpg";

import styled from "styled-components";
import CategoryButton from "./CategoryButton";

const MoviePage = () => {
  return (
    <Screen>
      <Title>Category</Title>
      <CategoryList>
        <CategoryButton
          src={ingMovie}
          alt="now-playing"
          subtitle="현재 상영중인"
        />
        <CategoryButton src={popularMovie} alt="popular" subtitle="인기있는" />
        <CategoryButton
          src={goodMovie}
          alt="top-rated"
          subtitle="높은 평가를 받은"
        />
        <CategoryButton
          src={comingsoonMovie}
          alt="up-coming"
          subtitle="개봉 예정중인"
        />
      </CategoryList>
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
  font-size: 45px;
  margin-left: 70px;
  margin-top: 15px;
  margin-bottom: 50px;
`;

const CategoryList = styled.div`
  display: flex;
`;

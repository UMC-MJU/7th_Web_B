import React from "react";
import ingMovie from "../assets/images/ingMovie.jpg";
import popularMovie from "../assets/images/popularMovie.jpg";
import goodMovie from "../assets/images/goodMovie.jpg";
import comingsoonMovie from "../assets/images/comingMovie.jpg";
import { useGetLatestMovies } from "../hooks/queries/useGetLatestMovies";
import styled from "styled-components";
import CategoryButton from "./CategoryButton";
import { useQuery } from "@tanstack/react-query";

const MoviePage = () => {
  // 2024년 개봉 영화 불러오기
  const {
    isLoading,
    isError,
    data: movies,
  } = useQuery({
    queryKey: ["movies", "latest"],
    queryFn: () => useGetLatestMovies(),
    keepPreviousData: true,
  });

  console.log(movies);

  return (
    <Screen>
      <SlideBox>
        <SlideTitle>2024 개봉작</SlideTitle>
        <Slide></Slide>
      </SlideBox>
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
  width: 100%;
`;

const Title = styled.h2`
  color: white;
  font-size: 30px;
  margin-left: 50px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: space-around;
  // width: 100%;
  padding-bottom: 50px;
`;

const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 30px;
  // margin: 0 auto;
`;

const SlideTitle = styled.h2`
  color: white;
  margin-left: 50px;
  font-size: 35px;
`;

const Slide = styled.div`
  height: 500px;
`;

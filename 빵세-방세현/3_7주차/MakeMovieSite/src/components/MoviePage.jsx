import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ingMovie from "../assets/images/ingMovie.jpg";
import popularMovie from "../assets/images/popularMovie.jpg";
import goodMovie from "../assets/images/goodMovie.jpg";
import comingsoonMovie from "../assets/images/comingMovie.jpg";
import { useGetLatestMovies } from "../hooks/queries/useGetLatestMovies";
import styled from "styled-components";
import CategoryButton from "./CategoryButton";
import { useQuery } from "@tanstack/react-query";
import WatchaCard from "./FrameComponent/WatchaCard";
import LoadingMv from "../assets/animation/LoadingMv";
import { GrLinkNext } from "react-icons/gr";

const MoviePage = () => {
  const [page, setPage] = useState(0);

  // 2024년 개봉 영화 불러오기
  const {
    isLoading,
    isError,
    data: movies,
    refetch,
  } = useQuery({
    queryKey: ["movies", "latest"],
    queryFn: () => useGetLatestMovies(),
    keepPreviousData: true,
  });

  const slides = [];

  if (movies?.results) {
    for (let i = 0; i < movies.results.length; i += 5) {
      slides.push(movies.results.slice(i, i + 5));
    }
  }

  const setNextPage = () => {
    if (page === slides.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  console.log(page);
  return (
    <Screen>
      {isLoading ? (
        <LoadingMv></LoadingMv>
      ) : isError ? (
        <div>에러</div>
      ) : slides[page] ? (
        <>
          <SlideBox>
            <SlideTitle>2024 Released Movies</SlideTitle>
            <SlideContainer>
              <AnimatePresence mode="wait">
                {/* 이전 슬라이드 */}
                <motion.div
                  key={`prev-${page}`}
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: -1500, opacity: 1 }}
                  exit={{ x: -1500, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    position: "absolute",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  {slides[page === 0 ? slides.length - 1 : page - 1].map(
                    (movie) => (
                      <WatchaCard key={movie.id} movie={movie} />
                    )
                  )}
                </motion.div>
                현재 슬라이드
                <motion.div
                  key={`current-${page}`}
                  initial={{ x: 1500, opacity: 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    position: "absolute",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  {slides[page].map((movie) => (
                    <WatchaCard key={movie.id} movie={movie} />
                  ))}
                </motion.div>
              </AnimatePresence>
              <NextButton onClick={setNextPage}></NextButton>
            </SlideContainer>
          </SlideBox>
          <Title>Category</Title>
          <CategoryList>
            <CategoryButton
              src={ingMovie}
              alt="now-playing"
              subtitle="현재 상영중인"
            />
            <CategoryButton
              src={popularMovie}
              alt="popular"
              subtitle="인기있는"
            />
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
        </>
      ) : (
        <div>데이터가 없습니다</div>
      )}
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
  margin-top: 15px;
  margin-bottom: 30px;
  margin-left: 55px;
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 50px;
`;

const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 70px;
`;

const SlideTitle = styled.h2`
  color: white;
  margin-left: 50px;
  font-size: 35px;
  margin-bottom: 20px;
`;

const SlideContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-left: 30px;
  height: 300px; /* 적절히 조정 */
`;

const NextButton = styled(GrLinkNext)`
  position: absolute;
  right: 40px; /* 적절히 위치 지정 */
  top: 50%; /* 컨테이너의 세로 중앙 */
  transform: translateY(-50%);
  color: white;
  font-size: 35px;
  z-index: 10; /* 슬라이드보다 위에 표시 */
  cursor: pointer;

  &:hover {
    color: #f0a500; /* 호버 시 색상 변경 */
  }
`;

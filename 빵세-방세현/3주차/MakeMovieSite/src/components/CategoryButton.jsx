import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Link를 import

const CategoryButton = ({ src, alt, subtitle }) => {
  let where = "";

  if (alt === "ing") {
    where = "/movie/now-playing";
  } else if (alt === "popular") {
    where = "/movie/popular";
  } else if (alt === "good") {
    where = "/movie/top-rated";
  } else if (alt === "coming") {
    where = "/movie/up-coming";
  }

  return (
    <InButton to={where}>
      <CategoryImage src={src} alt={alt}></CategoryImage>
      <Category>{subtitle}</Category>
    </InButton>
  );
};

export default CategoryButton;

const InButton = styled(Link)`
  margin-left: 40px;
  position: relative;
`;
const Category = styled.p`
  position: absolute; // 가장 가까운 위치에 있는 조상요소를 기준 (조상 relative로 설정)
  width: 130px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6); /* 투명한 검정색 */
  margin-left: 5px;
  bottom: 10px;
  right: 3px;
  text-align: center;
`;
const CategoryImage = styled.img`
  width: 280px;
  height: 140px;
  // margin-left: 50px;
`;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Link를 import

const CategoryButton = ({ src, alt, subtitle }) => {
  return (
    <InButton to={`/movie/${alt}`}>
      <CategoryImage src={src} alt={alt}></CategoryImage>
      <Category>{subtitle}</Category>
    </InButton>
  );
};

export default CategoryButton;

const InButton = styled(Link)`
  margin-left: 40px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;
const Category = styled.p`
  position: absolute; // 가장 가까운 위치에 있는 조상요소를 기준 (조상 relative로 설정)
  width: 130px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7); /* 투명한 검정색 */
  margin-left: 5px;
  bottom: 14px;
  right: 15px;
  text-align: center;
  font-size: 18px;
`;
const CategoryImage = styled.img`
  width: 280px;
  height: 200px;
  border-radius: 15%;
  // margin-left: 50px;
`;

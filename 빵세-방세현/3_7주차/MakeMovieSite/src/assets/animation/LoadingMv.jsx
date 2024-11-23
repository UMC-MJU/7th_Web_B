import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingMv = () => {
  return (
    <LoadingScreen>
      <Loader></Loader>
      <Infor>영화 정보를 불러오는 중입니다..</Infor>
    </LoadingScreen>
  );
};

export default LoadingMv;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000; /* 배경을 검은색으로 설정 */
  height: 100%; /* 화면 중앙 정렬 */
  width: 100%;
`;

// Keyframes 정의
const l51 = keyframes`
  0% {
    left: -16px;
    transform: translateY(-8px);
  }
  100% {
    left: calc(100% + 8px);
    transform: translateY(22px);
  }
`;

const l52 = keyframes`
  100% {
    top: -0.1px;
  }
`;

const Loader = styled.div`
  width: 40px;
  height: 30px;
  --c: no-repeat linear-gradient(#fff 0 0); /* 막대기 색상을 흰색으로 변경 */
  background: var(--c) 0 100% / 8px 30px, var(--c) 50% 100% / 8px 20px,
    var(--c) 100% 100% / 8px 10px;
  position: relative;
  clip-path: inset(-100% 0);
  margin-top: 70px;
  &::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff; /* 공의 색상을 흰색으로 변경 */
    left: -16px;
    top: 0;
    animation: ${l51} 2s linear infinite,
      ${l52} 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
  }
`;

const Infor = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #fff; /* 텍스트 색상을 흰색으로 변경 */
`;

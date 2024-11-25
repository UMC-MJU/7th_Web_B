import React from "react";
import styled, { keyframes } from "styled-components";

const loadingAni = () => {
  return (
    <LoadingScreen>
      <Loader></Loader>
      {/* <SpinnerImage src={spinnerImage} /> */}
      <Infor>게시글을 불러오는 중입니다..</Infor>
    </LoadingScreen>
  );
};

export default loadingAni;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  --c: no-repeat linear-gradient(#000 0 0);
  background: var(--c) 0 100% / 8px 30px, var(--c) 50% 100% / 8px 20px,
    var(--c) 100% 100% / 8px 10px;
  position: relative;
  clip-path: none;
  margin-top: 70px;
  &::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #000;
    left: -16px;
    top: 0;
    animation: ${l51} 2s linear infinite,
      ${l52} 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
  }
`;

const Infor = styled.div`
  margin-top: 20px;
`;

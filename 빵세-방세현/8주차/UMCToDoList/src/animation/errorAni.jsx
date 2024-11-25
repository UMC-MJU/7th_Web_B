import React from "react";
import styled, { keyframes } from "styled-components";

const errorAni = () => {
  return (
    <LoadingScreen>
      <Loader></Loader>
      <Infor>에러가 발생했습니다..</Infor>
    </LoadingScreen>
  );
};

export default errorAni;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const l4 = keyframes`
0% {clip-path: polygon(50% 50%,100%   0,100% 0,0 0,0 100%,100% 100%,100% 100%)}
  100% {clip-path: polygon(50% 50%,100% 65%,100% 0,0 0,0 100%,100% 100%,100%  35%)}
`;

const Loader = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #000 98%, #0000) 55% 20%/8px 8px
      no-repeat,
    #ffcc00;
  box-shadow: 2px -6px 12px 0px inset rgba(0, 0, 0, 0.7);
  animation: ${l4} 0.5s infinite steps(5) alternate;
`;

const Infor = styled.div`
  margin-top: 20px;
`;

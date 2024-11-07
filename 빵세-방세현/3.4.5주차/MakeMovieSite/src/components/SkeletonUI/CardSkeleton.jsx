import React from "react";
import styled, { keyframes } from "styled-components";

const CardSkeleton = () => {
  return (
    <Skeleton>
      <SkeletonImg />
      <SkeletonTitle />
      <SkeletonDate />
    </Skeleton>
  );
};

export default CardSkeleton;

const pulse = keyframes`
 0% {
    background-color: #94a3b8;
  }
  50% {
    background-color: #cbd5e1;
  }
  100% {
    background-color: #94a3b8;
  }
`;

const Skeleton = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  width: 190px;
  border: 0px;
`;
const SkeletonImg = styled.div`
  width: 130px;
  height: 180px;
  border: 1px solid black;
  border-radius: 5px;
  animation: ${pulse} 0.3s infinite ease-in-out;
`;

const SkeletonTitle = styled.div`
  font-size: 13px;
  width: 100px;
  height: 13px;
  margin-top: 10px;
  border-radius: 5px;
  animation: ${pulse} 0.3s infinite ease-in-out;
`;

const SkeletonDate = styled.div`
  font-size: 12px;
  width: 70px;
  height: 13px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  animation: ${pulse} 0.3s infinite ease-in-out;
`;

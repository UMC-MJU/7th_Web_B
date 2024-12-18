// Skeleton.tsx
import styled, { keyframes } from "styled-components";

const SkeletonCard = () => {
  return (
    <Skeleton>
      <SkeletonImg />
      <SkeletonTitle />
      <SkeletonDate />
    </Skeleton>
  );
};

const Skeleton = styled.div`
  width: 126px;
  margin: 20px 10px;
`;

const shimmer = keyframes`
  0% {
    background-color: #757575;
  }
  50% {
    background-color: #afafaf;
  }
  100% {
    background-color: #757575;
  }
`;

const SkeletonImg = styled.div`
  width: 126px;
  height: 182.56px;
  background-color: #838383;
  border-radius: 8px;
  animation: ${shimmer} 2.5s ease-in-out infinite;
`;

const SkeletonTitle = styled.div`
  margin: 3px 0px;
  width: 126px;
  height: 13px;
  background-color: #838383;
  border-radius: 8px;
  animation: ${shimmer} 2.5s ease-in-out infinite;
`;

const SkeletonDate = styled.div`
  background-color: #838383;
  width: 126px;
  height: 10px;
  border-radius: 8px;
  animation: ${shimmer} 2.5s ease-in-out infinite;
`;

export default SkeletonCard;

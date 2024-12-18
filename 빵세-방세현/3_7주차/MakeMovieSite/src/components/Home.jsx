import React from "react";
import styled, { keyframes } from "styled-components";
import { FaPersonFalling } from "react-icons/fa6";

const Home = () => {
  return (
    <Screen>
      <ImgBox>
        <Falling />
      </ImgBox>
      <TitleBox>
        <Title1>Welcome to</Title1>
        <Title2>YONGCHA</Title2>
      </TitleBox>
    </Screen>
  );
};

export default Home;

const T1move = keyframes`
0% {
opacity:0;
left:300px;}
100% {
opacity:1;
left: 0px;
}
`;

const T2move = keyframes`
0% {
opacity:0;
right:300px;
}
100% {
opacity:1;
right:0px;
}
`;

const Imgmove = keyframes`
0% {
top:75px;
}
100% {
top:180px;
}
`;
const Screen = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const Title1 = styled.p`
  color: white;
  font-size: 140px;
  margin-right: 200px;
  // 애니메이션 적용 시, position 설정 필수
  position: relative;
  animation: ${T1move} 2s 1;
`;

const Title2 = styled.p`
  color: white;
  font-size: 140px;
  margin-left: 200px;
  color: rgb(227, 62, 90);
  position: relative;
  animation: ${T2move} 2s 1;
`;

const ImgBox = styled.div`
  positoin: relative;
`;

const Falling = styled(FaPersonFalling)`
  color: white;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 180px;
  animation: ${Imgmove} 3s infinite;
`;

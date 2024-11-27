import React from "react";
import { CartIcon } from "../constants/icons";
import styled from "styled-components";
import { cartStore } from "../store/cartstore";
const NavBar = () => {
  const amount = cartStore((state) => state.amount);
  console.log(amount);
  return (
    <Nav>
      <NavTitle>REAL DATA UMC PlayList</NavTitle>
      <BagArea>
        <Bag>
          <CartIcon />
        </Bag>
        <AmountCount>{amount}</AmountCount>
      </BagArea>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: rgb(114, 114, 188);
  width: 100%;
`;

const Bag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; // 클릭 가능한 느낌 추가
  width: 40px; // 아이콘의 크기에 맞게 크기 조정
  height: 10px;
`;

const NavTitle = styled.h1`
  font-size: 50px;
  color: white;
  text-align: center;
`;

const BagArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute; /* Nav 내부에서 자유롭게 배치 가능 */
  right: 50px; /* 오른쪽 여백 설정 */
  padding-top: 55px;
`;

const AmountCount = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

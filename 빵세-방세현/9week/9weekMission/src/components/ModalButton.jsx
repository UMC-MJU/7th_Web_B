import React from "react";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ModalButton = () => {
  const dispatch = useDispatch();

  return (
    <ButtonBox>
      <Yes
        onClick={() => {
          dispatch(clearCart());
          dispatch(closeModal());
        }}
      >
        네
      </Yes>
      <No
        onClick={() => {
          // TODO: 모달도 꺼지는 상태를 연결
          dispatch(closeModal());
        }}
      >
        아니오
      </No>
    </ButtonBox>
  );
};

export default ModalButton;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Yes = styled.button`
  background-color: pink;
  border: 2px solid black;
  margin-right: 30px;
  width: 90px;
`;

const No = styled.button`
  background-color: white;
  border: 2px solid black;
  width: 100px;
`;

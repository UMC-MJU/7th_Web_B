import React from "react";
import styled from "styled-components";
import { modalStore } from "../store/modalStore";
import { cartStore } from "../store/cartstore";

const ModalButton = () => {
  const clearCart = cartStore((state) => state.clearCart);
  const closeModal = modalStore((state) => state.closeModal);

  return (
    <ButtonBox>
      <Yes
        onClick={() => {
          clearCart();
          closeModal();
        }}
      >
        네
      </Yes>
      <No
        onClick={() => {
          // TODO: 모달도 꺼지는 상태를 연결
          closeModal();
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

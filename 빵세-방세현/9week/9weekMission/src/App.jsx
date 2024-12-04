import { useEffect } from "react";
import styled from "styled-components";
import CartContainer from "./components/CartContainer";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";
import { cartStore } from "./store/cartstore";
import { modalStore } from "./store/modalStore";
import { useStore } from "zustand";
function App() {
  const cartItems = useStore(cartStore, (state) => state.cartItems);
  console.log(cartItems); // 상태 값 확인
  const isOpen = useStore(modalStore, (state) => state.isOpen);
  const calculateTotals = useStore(cartStore, (state) => state.calculateTotals);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      calculateTotals();
    }
  }, [cartItems]);

  return (
    <Screen>
      <CartContainer />
      {isOpen && (
        <ModalPortal>
          <Modal>
            <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
          </Modal>
        </ModalPortal>
      )}
    </Screen>
  );
}

export default App;

const Screen = styled.div`
  width: 100vw;
  max-width: 100%; /* 가로 스크롤 방지 */
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

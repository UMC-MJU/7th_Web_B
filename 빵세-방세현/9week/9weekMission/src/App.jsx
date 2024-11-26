import { useEffect } from "react";
import styled from "styled-components";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";
function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  console.log(isOpen);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);
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

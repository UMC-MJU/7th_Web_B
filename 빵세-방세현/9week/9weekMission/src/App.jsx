import { useEffect } from "react";
import styled from "styled-components";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);
  return (
    <Screen>
      <CartContainer />
    </Screen>
  );
}

export default App;

const Screen = styled.div`
  width: 100vw;
  max-width: 100%; /* 가로 스크롤 방지 */
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import styled from "styled-components";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
const CartContainer = () => {
  // Redux store에서 cartItems와 total을 가져옵니다.
  // 42:57
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  console.log(cartItems);
  return (
    <Section className="cart">
      <NavBar />
      <Title>당신이 선택한 음반</Title>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <BottomArea>
          <h4>
            총 가격 <span>{total}원</span>
          </h4>
          <button
            className="btn clear-btn"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            장바구니 초기화
          </button>
        </BottomArea>
      </footer>
    </Section>
  );
};

export default CartContainer;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 80px;
`;

const BottomArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

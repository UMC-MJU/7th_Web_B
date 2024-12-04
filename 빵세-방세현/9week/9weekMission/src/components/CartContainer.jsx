import CartItem from "./CartItem";
import styled from "styled-components";
import NavBar from "./NavBar";
import { useStore } from "zustand"; // zustand의 기본 훅 사용
import { cartStore } from "../store/cartstore";
import { modalStore } from "../store/modalStore";
const CartContainer = () => {
  const cartItems = useStore(cartStore, (state) => state.cartItems);
  console.log(Array.isArray(cartItems)); // true일 경우 정상
  console.log(cartItems);
  const total = useStore(cartStore, (state) => state.total);
  const openModal = useStore(modalStore, (state) => state.openModal);
  // console.log(cartItems);

  // cartItems가 배열인지 확인하고, 그렇지 않으면 빈 배열을 사용
  const validCartItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <Section className="cart">
      <NavBar />
      <Title>당신이 선택한 음반</Title>
      <div>
        {validCartItems.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          validCartItems.map((item) => <CartItem key={item.id} {...item} />)
        )}
      </div>
      <footer>
        <hr />
        <BottomArea>
          <h4>
            총 가격 <span>{total}원</span>
          </h4>
          <ResetButton
            className="btn clear-btn"
            onClick={() => {
              openModal();
            }}
          >
            장바구니 초기화
          </ResetButton>
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

const ResetButton = styled.button`
  background-color: skyblue;
  font-weight: bold;
  margin-bottom: 30px;
`;

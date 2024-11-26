import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ChevronUp, ChevronDown } from "../constants/icons";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

// CartItem 컴포넌트는 id, title, singer, price, img 등을 props로 받습니다.
const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <Entire>
      <EachImage src={img} alt="음반 이미지" />
      <SongInfor>
        <TitleAndSinger>
          <SongTitle>{title}</SongTitle>
          <SongSinger>{singer}</SongSinger>
        </TitleAndSinger>
        <SongPrice>₩ {price}</SongPrice>
      </SongInfor>
      <UpOrDown>
        <UpButton onClick={() => dispatch(increase(id))}>
          <ChevronUp color="green" />
        </UpButton>
        <div>{amount}</div>
        <DownButton
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <ChevronDown color="green" />
        </DownButton>
      </UpOrDown>
    </Entire>
  );
};

export default CartItem;

const Entire = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SongInfor = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  // background-color: black;
`;
const EachImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;

const TitleAndSinger = styled.div`
  display: flex;
  padding-top: 5px;
`;
const SongTitle = styled.div`
  color: black;
  font-size: 22px;
  font-weight: bold;
  margin-right: 10px;
`;

const SongSinger = styled.div`
  color: black;
  font-size: 19px;
`;

const SongPrice = styled.div`
  color: black;
  font-size: 19px;
  margin-bottom: 20px;
`;

const UpOrDown = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// UpButton과 DownButton을 div로 변경
const UpButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; // 클릭 가능한 느낌 추가
  width: 24px; // 아이콘의 크기에 맞게 크기 조정
  height: 24px;
`;

const DownButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; // 클릭 가능한 느낌 추가
  width: 24px; // 아이콘의 크기에 맞게 크기 조정
  height: 24px;
`;

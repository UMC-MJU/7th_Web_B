import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // TODO: 증가
    increase: (state, { payload }) => {
      const itemId = payload;
      //find를 통해 내가 클릭한 음반만을 찾음.
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      item.amount += 1;
    },
    //TODO: 감소
    decrease: (state, { payload }) => {
      const itemId = payload;
      //find를 통해 내가 클릭한 음반만을 찾음.
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      item.amount -= 1;
    },
    //TODO: 아이템 제거
    //TODO: 모든 아이템 제거 (clear)
    //TODO: TOTAL을 계산. (각각의 아이템 * 수량)
  },
});
export const { increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;

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
  // reducers는 액션의 타입을 자동으로 생성
  reducers: {
    // TODO: 증가
    // 액션 타입: cart/increase , 전달된 데이터: payload
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
    removeItem: (state, { payload }) => {
      const itemId = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    //TODO: 모든 아이템 제거 (clear)
    clearCart: (state) => {
      state.cartItems = [];
    },
    //TODO: TOTAL을 계산. (각각의 아이템 * 수량)
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});
export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;

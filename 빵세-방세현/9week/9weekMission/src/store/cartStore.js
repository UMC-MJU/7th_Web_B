import { create } from "zustand";
import cartItems from "../constants/cartItems";

export const cartStore = create((set) => ({
  cartItems: Array.isArray(cartItems) ? cartItems : [],
  amount: 0,
  total: 0,

  increase: (itemId) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, amount: cartItem.amount + 1 } // 불변성을 지키며 상태 갱신
          : cartItem
      );
      return { cartItems: updatedCartItems };
    }),

  decrease: (itemId) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, amount: cartItem.amount - 1 } // 불변성을 지키며 상태 갱신
          : cartItem
      );
      return { cartItems: updatedCartItems };
    }),

  removeItem: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),

  clearCart: () =>
    set((state) => ({
      cartItems: [],
    })),

  calculateTotals: () =>
    set((state) => {
      if (!Array.isArray(state.cartItems)) {
        console.warn("cartItems is not an array or is undefined.");
        return state; // 상태를 그대로 반환하여 오류 방지
      }

      let amounts = 0;
      let totals = 0;

      state.cartItems.forEach((item) => {
        if (item && item.amount && item.price) {
          const price = parseFloat(item.price);
          if (!isNaN(price)) {
            amounts += item.amount;
            totals += item.amount * price;
          } else {
            console.warn(`Invalid price for item ${item.title}: ${item.price}`);
          }
        } else {
          console.warn(`Invalid item data:`, item);
        }
      });

      return {
        ...state, // 기존 상태 유지하면서 amounts, total만 업데이트
        amount: amounts,
        total: totals,
      };
    }),
}));

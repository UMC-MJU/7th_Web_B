import {createSlice} from '@reduxjs/toolkit';
import MusicData from '../constants/cartItems';

const initialState = {
    items: MusicData,
    totalCount: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name : 'cartfunction',
    initialState,
    reducers:{
        // 음반수량 증가
        increase: (state, action) => {
            state.items = state.items.map(e => e.id === action.payload ? {...e, amount: e.amount+1}: e);
        },
        // 음반수량 감소
        decrease: (state, action) => {
            state.items = state.items.map(e => e.id === action.payload ? {...e, amount: e.amount-1}: e);
        },
        // 음반수량이 1보다 작아질 때, 자동 제거
        removeItem: (state, action) => {
            state.items = state.items.filter(e => e.id !== action.payload);
        },
        // 장바구니 초기화
        clearCart: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0;
        },
        // 전체 수량 계산
        calculateTotals: (state) => {
            const { totalCount, totalPrice } = state.items.reduce(
                (totals, item) => {
                    totals.totalCount += item.amount;
                    totals.totalPrice += item.amount * item.price; // 가격 계산
                    return totals;
                },
                { totalCount: 0, totalPrice: 0 } // 초기값
            );

            state.totalCount = totalCount; // 총 수량 업데이트
            state.totalPrice = totalPrice; // 총 가격 업데이트

            console.log(`총 수량: ${totalCount}, 총 가격: ${totalPrice}`);
        },
        
    }
})

export const {increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions;
//store에서 add, remove, complte 액션을 내보낸다.
export default cartSlice.reducer;
import {create} from 'zustand';
import MusicData from '../constants/cartItems';

const useCartStore = create((set) => ({
    // 초기 상태 정의
    items: MusicData,
    totalCount: 0,
    totalPrice: 0,

    // 음반 수량 증가
    increase: (id) => {
        set((state) => ({
            items: state.items.map((e) =>
                e.id === id ? { ...e, amount: e.amount + 1 } : e
            ),
        }));
    },

    // 음반 수량 감소
    decrease: (id) => {
        set((state) => ({
            items: state.items.map((e) =>
                e.id === id ? { ...e, amount: e.amount - 1 } : e
            ),
        }));
    },

    // 음반 제거 (수량이 1보다 작아질 때)
    removeItem: (id) => {
        set((state) => ({
            items: state.items.filter((e) => e.id !== id),
        }));
    },

    // 장바구니 초기화
    clearCart: () => {
        set(() => ({
            items: [],
            totalCount: 0,
            totalPrice: 0,
        }));
    },

    // 총 수량 및 총 가격 계산
    calculateTotals: () => {
        set((state) => {
            const { totalCount, totalPrice } = state.items.reduce(
                (totals, item) => {
                    totals.totalCount += item.amount;
                    totals.totalPrice += item.amount * item.price; // 가격 계산
                    return totals;
                },
                { totalCount: 0, totalPrice: 0 } // 초기값
            );
            console.log(`총 수량: ${totalCount}, 총 가격: ${totalPrice}`)
            return { totalCount, totalPrice };
        });
    },
}));

export default useCartStore;

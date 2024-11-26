import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // TODO: 모달을 여는 ACTION
    openModal: (state, action) => {
      state.isOpen = true;
    },
    // TODO: 모달을 닫는 ACTION
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

export default configureStore({
  reducer: {
    todo: todoSlice, // state.todo를 todoSlice가 관리
  },
});

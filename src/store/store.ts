import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import todoListReducer from "./todoListSlice";

export const store: EnhancedStore = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});

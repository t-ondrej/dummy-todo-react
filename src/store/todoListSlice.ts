import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./todoModel";

export interface TodoListState {
  todos: Todo[];
}

const initialState: TodoListState = {
  todos: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const idx = state.todos.map(({ id }) => id).indexOf(action.payload.id);
      state.todos[idx] = action.payload;
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const { addTodo, updateTodo, removeTodo } = todoListSlice.actions;

export const selectTodos = (state: { todoList: TodoListState }) => {
  return state.todoList.todos;
};

export default todoListSlice.reducer;

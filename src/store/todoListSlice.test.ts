import { getNewTodo } from "./todoModel";
import todoListReducer, {
  addTodo,
  removeTodo,
  selectTodos,
  TodoListState,
  updateTodo,
} from "./todoListSlice";

describe("TodoListSlice", () => {
  let state: TodoListState;

  beforeEach(() => {
    state = { todos: [] };
  });

  describe("reducer", () => {
    const reducer = todoListReducer;

    it("should add todo", () => {
      const todo = getNewTodo();
      const resultState = reducer(state, addTodo(todo));
      expect(resultState.todos).toEqual([todo]);
    });

    it("should update todo", () => {
      const todo = getNewTodo();
      state.todos = [todo];
      const updatedTodo = { ...todo, done: true };
      const resultState = reducer(state, updateTodo(updatedTodo));
      expect(resultState.todos[0]).toEqual(updatedTodo);
    });

    it("should remove todo", () => {
      const todo = getNewTodo();
      state.todos = [todo];
      const resultState = reducer(state, removeTodo(todo));
      expect(resultState.todos.length).toEqual(0);
    });
  });

  describe("selectors", () => {
    it("should select todos", () => {
      const todo = getNewTodo();
      state.todos = [todo];
      const result = selectTodos({ todoList: state });
      expect(result).toEqual([todo]);
    });
  });
});

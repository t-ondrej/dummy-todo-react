import { act, render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import * as redux from "react-redux";
import { store } from "../store/store";
import { getNewTodo } from "../store/todoModel";
import TodoList from "./TodoList";

describe("TodoList", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should put done todos at the bottom", () => {
    act(() => {
      const firstTodo = getNewTodo({ done: true });
      const secondTodo = getNewTodo();

      const spy = jest.spyOn(redux, "useSelector");
      spy.mockReturnValue([firstTodo, secondTodo]);

      render(
        <redux.Provider store={store}>
          <TodoList />
        </redux.Provider>,
        { container }
      );
    });
    expect(container.children[0].dataset.testid).toEqual("todo-item-1");
    expect(container.children[1].dataset.testid).toEqual("todo-item-0");
  });
});

import { act, queryByTestId, render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { getNewTodo, Todo } from "../store/todoModel";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  let container: HTMLElement;
  let todo: Todo;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    todo = getNewTodo();
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should show correct checkmark based on done state", () => {
    act(() => {
      render(
        <Provider store={store}>
          <TodoItem todo={todo} />
        </Provider>,
        { container }
      );
    });

    expect(queryByTestId(container, "checkmark-not-done")).not.toBeNull();
    expect(queryByTestId(container, "checkmark-done")).toBeNull();

    act(() => {
      todo.done = true;
      render(
        <Provider store={store}>
          <TodoItem todo={todo} />
        </Provider>,
        { container }
      );
    });

    expect(queryByTestId(container, "checkmark-not-done")).toBeNull();
    expect(queryByTestId(container, "checkmark-done")).not.toBeNull();
  });

  it('should show due date control only if defined', () => {
    act(() => {
      render(
        <Provider store={store}>
          <TodoItem todo={todo} />
        </Provider>,
        { container }
      );
    });
    expect(queryByTestId(container, "due-date")).toBeNull();

    act(() => {
      todo.dueDate = new Date();
      render(
        <Provider store={store}>
          <TodoItem todo={todo} />
        </Provider>,
        { container }
      );
    });
    expect(queryByTestId(container, "due-date")).not.toBeNull();
  });
});

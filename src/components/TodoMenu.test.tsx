import {
  act,
  fireEvent,
  queryByTestId,
  render,
  screen,
} from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { getNewTodo, Todo } from "../store/todoModel";
import TodoMenu from "./TodoMenu";

describe("TodoMenu", () => {
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

  it("should show edit and delete if todo is not done", () => {
    act(() => {
      render(
        <TodoMenu
          data-testid="test"
          todo={todo}
          onRemove={() => void 0}
          onEdit={() => void 0}
        />,
        { container }
      );
    });

    fireEvent.click(screen.getByTestId("todo-menu-trigger"));

    expect(queryByTestId(container.parentElement, "edit")).not.toBeNull();
    expect(queryByTestId(container.parentElement, "remove")).not.toBeNull();
  });

  it("should show only delete if todo is done", () => {
    act(() => {
      todo = { ...todo, done: true };
      render(
        <TodoMenu todo={todo} onRemove={() => void 0} onEdit={() => void 0} />,
        { container }
      );
    });

    fireEvent.click(screen.getByTestId("todo-menu-trigger"));

    expect(queryByTestId(container.parentElement, "edit")).toBeNull();
    expect(queryByTestId(container.parentElement, "remove")).not.toBeNull();
  });
});

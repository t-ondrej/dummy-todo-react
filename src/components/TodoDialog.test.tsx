import {
  act,
  fireEvent,
  queryByTestId,
  render,
  screen
} from "@testing-library/react";
import { useState } from "react";
import { unmountComponentAtNode } from "react-dom";
import { getNewTodo, Todo } from "../store/todoModel";
import TodoDialog from "./TodoDialog";

describe("TodoDialog", () => {
  let container: HTMLElement;
  let todo: Todo;

  beforeEach(() => {
    todo = getNewTodo();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe("SubmitButton", () => {
    it("should be disabled if required fields are empty", () => {
      act(() => {
        render(<DialogWrapper todo={todo} />, { container });
      });
      fireEvent.click(queryByTestId(container, "todo-dialog-trigger"));
      expect(
        queryByTestId(container.parentElement, "todo-dialog-submit")
      ).toBeDisabled();
    });

    it("should be enabled if required fields are not empty", () => {
      act(() => {
        render(<DialogWrapper todo={todo} />, { container });
      });
      fireEvent.click(screen.getByTestId("todo-dialog-trigger"));

      const titleField = screen.getByTestId("todo-dialog-title");
      fireEvent.change(titleField, { target: { value: "Title" } });
      const descriptionField = screen.getByTestId("todo-dialog-description");
      fireEvent.change(descriptionField, { target: { value: "Description" } });

      expect(
        queryByTestId(container.parentElement, "todo-dialog-submit")
      ).not.toBeDisabled();
    });
  });
});

const DialogWrapper = ({ todo }: { todo: Todo }) => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  const onDialogClose = (_?: Todo) => setDialogOpened(false);

  return (
    <>
      <button
        data-testid="todo-dialog-trigger"
        onClick={() => setDialogOpened(true)}
      ></button>
      <TodoDialog
        onClose={onDialogClose}
        open={dialogOpened}
        todoInput={todo}
      />
    </>
  );
};

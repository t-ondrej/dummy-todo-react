import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useEffect, useState } from "react";
import { Todo } from "../store/todoModel";

type TodoDialogProps = {
  onClose: (todo?: Todo) => void;
  open: boolean;
  todoInput: Todo;
};

const TodoDialog = ({ onClose, open, todoInput }: TodoDialogProps) => {
  const [todo, setTodo] = useState<Todo>(todoInput);

  useEffect(() => {
    setTodo(todoInput);
  }, [todoInput]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open={open} onClose={() => onClose()}>
        <DialogTitle>Add todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Todo title"
            type="text"
            required
            fullWidth
            inputProps={{ "data-testid": "todo-dialog-title" }}
            value={todo.title}
            onChange={(title) =>
              setTodo((prevTodo) => ({
                ...prevTodo,
                title: title.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="description"
            label="Todo description"
            type="text"
            required
            fullWidth
            inputProps={{ "data-testid": "todo-dialog-description" }}
            value={todo.description}
            onChange={(description) =>
              setTodo((prevTodo) => ({
                ...prevTodo,
                description: description.target.value,
              }))
            }
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="todo-due-date"
            label="Todo due date"
            value={todo.dueDate || null}
            minDate={new Date()}
            onChange={(dueDate) =>
              setTodo((prevTodo) => ({
                ...prevTodo,
                dueDate,
              }))
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => onClose(todo)}
            color="primary"
            data-testid="todo-dialog-submit"
            disabled={!todo.title || !todo.description}
          >
            Add todo
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default TodoDialog;

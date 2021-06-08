import { Button, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoListSlice";
import TodoDialog from "./TodoDialog";
import { getNewTodo, Todo } from "../store/todoModel";

const useStyles = makeStyles({
  addTodo: {
    width: "460px",
  },
});

const AddTodo = () => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  // useState(getNewTodo()) vs useState(() => getNewTodo()) <--- Why in the first case, the factory function is called always
  const [newTodo, setNewTodo] = useState<Todo>(() => getNewTodo());
  const dispatch = useDispatch();
  const classNames = useStyles();

  const onDialogClose = (res?: Todo) => {
    setDialogOpened(false);

    if (res) {
      dispatch(addTodo(res));
      setNewTodo(getNewTodo());
    }
  };

  return (
    <>
      <Button
        className={classNames.addTodo}
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setDialogOpened(true)}
      >
        ADD TODO
      </Button>

      <TodoDialog
        onClose={onDialogClose}
        open={dialogOpened}
        todoInput={newTodo}
      />
    </>
  );
};

export default AddTodo;

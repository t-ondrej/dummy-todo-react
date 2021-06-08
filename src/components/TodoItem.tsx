import {
  Card,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CheckCircleOutlined, CheckCircleRounded } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../store/todoListSlice";
import { Todo } from "../store/todoModel";
import TodoDialog from "./TodoDialog";
import TodoMenu from "./TodoMenu";

type TodoProps = {
  todo: Todo;
};

const useStyles = makeStyles({
  property: {
    marginBottom: "12px",
    maxWidth: "400px",
    wordBreak: "break-all",
    "&:last-child": {
      marginBottom: "unset",
    },
  },
  card: (props: { done: boolean }) => ({
    maxWidth: "460px",
    marginTop: "12px",
    background: props.done ? "#3fb5a3 " : "#3f51b5",
    color: "white",
    position: "relative",
  }),
  doneMark: {
    position: "absolute",
    right: "0",
    bottom: "12px",
    color: "white",
  },
});

const TodoItem = ({ todo }: TodoProps) => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const classes = useStyles(todo);
  const dispatch = useDispatch();

  const onDialogClose = (res?: Todo) => {
    setDialogOpened(false);

    if (res) {
      dispatch(updateTodo(res));
    }
  };

  const onMarkAsDone = () => {
    dispatch(updateTodo({ ...todo, done: !todo.done }));
  };

  return (
    <Card className={classes.card} data-testid={`todo-item-${todo.id}`}>
      <CardContent>
        <TodoMenu
          todo={todo}
          onEdit={() => setDialogOpened(true)}
          onRemove={() => dispatch(removeTodo(todo))}
        />

        <IconButton className={classes.doneMark} onClick={onMarkAsDone}>
          {todo.done ? (
            <CheckCircleRounded data-testid="checkmark-done" />
          ) : (
            <CheckCircleOutlined data-testid="checkmark-not-done" />
          )}
        </IconButton>

        <Typography variant="caption">Title</Typography>
        <Typography className={classes.property}>{todo.title}</Typography>

        <Typography variant="caption">Description</Typography>
        <Typography className={classes.property}>{todo.description}</Typography>

        {todo.dueDate && (
          <>
            <Typography variant="caption">Due date</Typography>
            <Typography data-testid="due-date">
              {todo.dueDate.toLocaleDateString("en-GB")}
            </Typography>
          </>
        )}
      </CardContent>

      <TodoDialog
        onClose={onDialogClose}
        open={dialogOpened}
        todoInput={todo}
      />
    </Card>
  );
};

export default TodoItem;

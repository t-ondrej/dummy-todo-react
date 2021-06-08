import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { selectTodos } from "../store/todoListSlice";

const TodoList = () => {
  const todos = useSelector(selectTodos);
  return (
    <>
      {[...todos]
        .sort((a, b) => Number(a.done) - Number(b.done))
        .map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
    </>
  );
};

export default TodoList;

import { Container, makeStyles } from "@material-ui/core";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const useStyles = makeStyles({
  container: {
    marginTop: '24px'
  }
});

function App() {
  const classNames = useStyles();

  return (
    <Container className={classNames.container} maxWidth="sm">
      <AddTodo />
      <TodoList />
    </Container>
  );
}

export default App;

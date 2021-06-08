import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  dueDate?: MaterialUiPickersDate;
}

export function getNewTodo(todoPropertiesToMerge?: Partial<Todo>): Todo {
  return {
    id: idGenerator.next().value,
    title: "",
    description: "",
    dueDate: null,
    done: false,
    ...todoPropertiesToMerge
  };
}

function* getNextId(): Generator<number> {
  let idx = 0;

  while (true) {
    yield idx++;
  }
}

const idGenerator = getNextId();

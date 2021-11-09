export interface TodoItem {
  id: string;
  title: string;
  done: boolean;
}

export interface CreateTodoItem {
  title: string;
}

export interface UpdateTodoDone {
  id: string;
  done: boolean;
}

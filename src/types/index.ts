export interface Board {
  id: string;
  name: string;
  type: 'fixed' | 'board';
  todoOrder?: string[];
  color?: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  starred: boolean;
  boardId?: string;
}

export interface BoardGroup extends Board {
  todos: Todo[];
}

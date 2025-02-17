export interface Board {
  id: string;
  name: string;
  color?: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  starred: boolean;
  boardId?: string;
}

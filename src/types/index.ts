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
  starred: boolean;
  boardId?: string;
  status: Status;
}

export interface BoardGroup extends Board {
  todos: Todo[];
}

export const STATUS = {
  todo: '할 일',
  inProgress: '진행 중',
  done: '완료',
} as const;

export type Status = keyof typeof STATUS;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Todo } from '@/types';

const TODO_STORAGE_KEY = 'TODO_STORAGE_KEY';

interface TodoInput {
  text: string;
  starred: boolean;
  completed?: boolean;
  boardId?: string;
}

interface TodoStore {
  todos: Todo[];

  createTodo: (data: TodoInput) => Todo;
  updateTodo: (id: string, data: Partial<TodoInput>) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      createTodo: (data) => {
        const newTodo: Todo = {
          id: nanoid(),
          text: data.text,
          starred: data.starred,
          completed: data.completed || false,
          boardId: data.boardId || 'default',
        };

        set((state) => ({ todos: [newTodo, ...state.todos] }));

        return newTodo;
      },

      updateTodo: (id, data) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...data } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    { name: TODO_STORAGE_KEY }
  )
);

export const useCurrentBoardTodos = (boardId: string) => {
  const todos = useTodoStore((state) => state.todos);
  if (boardId === 'all') return todos;
  if (boardId === 'starred') return todos.filter((todo) => todo.starred);
  return todos.filter((todo) => todo.boardId === boardId);
};

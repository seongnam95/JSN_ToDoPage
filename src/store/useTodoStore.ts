import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Status, Todo } from '@/types';

const TODO_STORAGE_KEY = 'TODO_STORAGE_KEY';

interface TodoInput {
  text: string;
  starred: boolean;
  boardId?: string;
}

interface TodoStore {
  todos: Todo[];

  createTodo: (data: TodoInput, status?: Status) => Todo;
  updateTodo: (id: string, data: Partial<TodoInput>) => void;
  updateTodoStatus: (id: string, status: Status) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      createTodo: (data, status) => {
        const newTodo: Todo = {
          id: nanoid(),
          text: data.text,
          starred: data.starred,
          boardId: data.boardId || 'default',
          status: status || 'todo',
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

      updateTodoStatus: (id, status) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, status } : todo
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

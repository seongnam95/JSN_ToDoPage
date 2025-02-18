import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { Status } from '@/types';

const TODO_ORDER_STORAGE_KEY = 'TODO_ORDER_KEY';

type TodoOrderMap = {
  [key in Status]: string[];
};

interface TodoOrderStore {
  todoOrderMap: TodoOrderMap;
  updateTodoOrder: (status: Status, order: string[]) => void;
}

export const useTodoOrder = create<TodoOrderStore>()(
  persist(
    (set) => ({
      todoOrderMap: {
        todo: [],
        inProgress: [],
        done: [],
      },

      updateTodoOrder: (status, order) => {
        set((state) => ({
          todoOrderMap: {
            ...state.todoOrderMap,
            [status]: order,
          },
        }));
      },
    }),
    { name: TODO_ORDER_STORAGE_KEY }
  )
);

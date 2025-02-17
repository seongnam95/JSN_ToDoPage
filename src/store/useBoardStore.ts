import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Board } from '@/types';

const BOARD_STORAGE_KEY = 'BOARD_STORAGE_KEY';

type BoardInput = Partial<Omit<Board, 'id'>>;

interface BoardStore {
  boards: Board[];
  selectedBoard: Board;

  createBoard: (data?: BoardInput) => Board;
  updateBoard: (id: string, data: BoardInput) => void;
  deleteBoard: (id: string) => void;
  selectBoard: (board: Board) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      selectedBoard: { id: 'all', name: '전체' },
      createBoard: (data) => {
        const newBoard: Board = {
          id: nanoid(),
          name: data?.name || '새 보드',
          color: data?.color || '#000000',
        };

        set((state) => ({ boards: [newBoard, ...state.boards] }));

        return newBoard;
      },

      updateBoard: (id, data) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, ...data } : board
          ),
        })),

      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),

      selectBoard: (board) => set(() => ({ selectedBoard: board })),
    }),
    { name: BOARD_STORAGE_KEY }
  )
);

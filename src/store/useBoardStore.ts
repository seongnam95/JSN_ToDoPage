import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Board } from '@/types';

const BOARD_STORAGE_KEY = 'BOARD_STORAGE_KEY';

const DEFAULT_BOARDS: Board[] = [
  { id: 'all', name: '전체', type: 'fixed' },
  { id: 'starred', name: '중요한 일', type: 'fixed' },
  { id: 'default', name: '기타', color: '#C5C5C5', type: 'board' },
];

type BoardInput = Partial<Omit<Board, 'id'>>;
interface BoardStore {
  boards: Board[];
  boardOrder: string[];

  createBoard: (data?: BoardInput) => Board;
  updateBoard: (id: string, data: BoardInput) => void;
  deleteBoard: (id: string) => void;
  updateBoardOrder: (order: string[]) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: DEFAULT_BOARDS,
      boardOrder: [],

      createBoard: (data) => {
        const newBoard: Board = {
          id: nanoid(),
          name: data?.name || '새 보드',
          color: data?.color || '#000000',
          todoOrder: [],
          type: 'board',
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

      updateBoardOrder: (order) => set(() => ({ boardOrder: order })),
    }),
    { name: BOARD_STORAGE_KEY }
  )
);

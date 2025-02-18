import { useBoardStore } from '@/store/useBoardStore';
import { useTodoStore } from '@/store/useTodoStore';
import { BoardGroup } from '@/types';
import { notFound } from 'next/navigation';

interface TodoHookProps {
  boardId: string;
}

export const useTodo = ({ boardId }: TodoHookProps) => {
  const boards = useBoardStore((state) => state.boards);
  const todos = useTodoStore((state) => state.todos);

  const currentBoard = boards.find((board) => board.id === boardId);

  if (!currentBoard) notFound();

  /** 작업 그룹 목록 */
  const userBoards = boards.filter((board) => board.type === 'board');
  const boardGroups: BoardGroup[] = userBoards.map((board) => {
    const boardTodos = todos.filter((todo) => todo.boardId === board.id);
    return { ...board, todos: boardTodos };
  });

  /** 현재 보드의 작업 목록 */
  const boardTodos = todos.filter((todo) => {
    if (boardId === 'all') return true;
    if (boardId === 'starred') return todo.starred;
    return todo.boardId === boardId;
  });

  const isEmptyTodo = todos.length === 0;

  return {
    currentBoard,
    boardGroups,
    boardTodos,
    isEmptyTodo,
  };
};

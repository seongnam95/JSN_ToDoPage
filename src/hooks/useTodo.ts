import { useBoardStore } from '@/store/useBoardStore';
import { useTodoStore } from '@/store/useTodoStore';
import { BoardGroup } from '@/types';

export const useTodo = () => {
  const { boards, selectedBoardId } = useBoardStore();
  const todos = useTodoStore((state) => state.todos);
  const currentBoard = boards.find((board) => board.id === selectedBoardId);

  if (!currentBoard) throw new Error('잘못된 접근입니다');

  /** 보드와 할 일 그룹 목록 */
  const userBoards = boards.filter((board) => board.type === 'user');
  const boardGroups: BoardGroup[] = userBoards.map((board) => {
    const boardTodos = todos.filter((todo) => todo.boardId === board.id);

    return { ...board, todos: boardTodos };
  });

  /** 현재 보드의 할 일 목록 */
  const currentBoardTodos = todos.filter((todo) => {
    if (selectedBoardId === 'all') return true;
    if (selectedBoardId === 'starred') return todo.starred;
    return todo.boardId === selectedBoardId;
  });

  const isEmptyTodo = todos.length === 0;

  return { currentBoard, boardGroups, currentBoardTodos, isEmptyTodo };
};

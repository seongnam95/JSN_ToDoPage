import { useBoardStore } from '@/store/useBoardStore';
import { useTodoStore } from '@/store/useTodoStore';
import { BoardGroup } from '@/types';

export const useTodo = () => {
  const boards = useBoardStore((state) => state.boards);
  const todos = useTodoStore((state) => state.todos);
  const currentBoard = useBoardStore((state) => state.selectedBoard);

  /** 보드와 할 일 그룹 목록 */
  const boardGroups: BoardGroup[] = boards.map((board) => {
    const boardTodos = todos.filter((todo) => todo.boardId === board.id);

    return { ...board, todos: boardTodos };
  });

  /** 현재 보드의 할 일 목록 */
  const currentBoardTodos = todos.filter((todo) => {
    if (currentBoard.id === 'all') return true;
    if (currentBoard.id === 'starred') return todo.starred;
    return todo.boardId === currentBoard.id;
  });

  const isEmptyTodo = todos.length === 0;

  return { currentBoard, boardGroups, currentBoardTodos, isEmptyTodo };
};

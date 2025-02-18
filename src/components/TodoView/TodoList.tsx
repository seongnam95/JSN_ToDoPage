import { useTodoStore } from '@/store/useTodoStore';
import { useState } from 'react';
import { Todo } from '@/types';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
  order?: string[];
  className?: string;
}

export function TodoList({ className, todos, order }: TodoListProps) {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const isEditMode = editTodoId !== null;

  const { updateTodo, deleteTodo } = useTodoStore();

  const orderMap = new Map(order?.map((id, index) => [id, index]));
  const sortedTodos = todos.sort(
    (a, b) =>
      (orderMap.get(a.id) ?? Infinity) - (orderMap.get(b.id) ?? Infinity)
  );

  /** 할 일 텍스트 변경 */
  const handleChangeTodoText = (todoId: string, text: string) => {
    updateTodo(todoId, { text });
    setEditTodoId(null);
  };

  /** 할 일 완료 여부 변경 */
  const handleChangeTodoChecked = (todoId: string, completed: boolean) => {
    updateTodo(todoId, { completed });
  };

  /** 할 일 즐겨찾기 여부 변경 */
  const handleChangeTodoStarred = (todoId: string, starred: boolean) => {
    updateTodo(todoId, { starred });
  };

  /** 할 일 삭제 */
  const handleDeleteTodo = (todoId: string) => {
    deleteTodo(todoId);
  };

  /** 할 일 보드 변경 */
  const handleChangeTodoBoard = (todoId: string, moveToBoardId: string) => {
    updateTodo(todoId, { boardId: moveToBoardId });
  };

  return (
    <ul className={className}>
      {sortedTodos.map((todo) => {
        if (!todo) return null;
        return (
          <TodoListItem
            key={todo.id}
            disabled={isEditMode}
            editing={editTodoId === todo.id}
            onBlur={() => setEditTodoId(null)}
            onChangeText={handleChangeTodoText}
            onChangeStarred={handleChangeTodoStarred}
            onChangeChecked={handleChangeTodoChecked}
            onMenuChangeText={setEditTodoId}
            onMenuChangeBoard={handleChangeTodoBoard}
            onMenuDelete={handleDeleteTodo}
            todo={todo}
          />
        );
      })}
    </ul>
  );
}

import { useTodoStore } from '@/store/useTodoStore';
import { useState } from 'react';
import { Todo } from '@/types';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { useBoardStore } from '@/store/useBoardStore';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
  moveMode?: boolean;
  todos: Todo[];
  boardId?: string;
  order?: string[];
  className?: string;
}

export function TodoList({
  className,
  todos,
  order,
  boardId,
  moveMode,
}: TodoListProps) {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const isEditMode = editTodoId !== null;

  const { updateTodo, deleteTodo } = useTodoStore();
  const { updateBoard } = useBoardStore();

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !boardId) return;

    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);

    const newOrder = todos.map((t) => t.id);
    const [removed] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, removed);

    updateBoard(boardId, { todoOrder: newOrder });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className={className}>
          {sortedTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              disabled={isEditMode || moveMode}
              moveMode={moveMode}
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
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

import { cn } from '@/lib/cn';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useCurrentBoardTodos, useTodoStore } from '@/store/useTodoStore';
import { useState } from 'react';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
  scrollRef?: React.Ref<HTMLDivElement>;
  className?: string;
  boardId: string;
}

export function TodoList({ className, scrollRef, boardId }: TodoListProps) {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const isEditMode = editTodoId !== null;

  const { updateTodo, deleteTodo } = useTodoStore();
  const todos = useCurrentBoardTodos(boardId);

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

  return (
    <ScrollArea ref={scrollRef} className={cn('h-full', className)}>
      <ul className='mt-2 pb-10'>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            disabled={isEditMode}
            editing={editTodoId === todo.id}
            onBlur={() => setEditTodoId(null)}
            onChangeText={handleChangeTodoText}
            onChangeStarred={handleChangeTodoStarred}
            onChangeChecked={handleChangeTodoChecked}
            onMenuChangeText={setEditTodoId}
            onMenuDelete={handleDeleteTodo}
            {...todo}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}

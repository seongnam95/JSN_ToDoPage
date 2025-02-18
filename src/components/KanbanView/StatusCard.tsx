import { TodoCard } from '@/components/KanbanView/TodoCard';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useTodoOrder } from '@/store/useTodoOrder';
import { useTodoStore } from '@/store/useTodoStore';
import { Status, STATUS, Todo } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface StatusCardProps {
  id: string;
  title: string;
  todos: Todo[];
  status: Status;
}

export function StatusCard({ id, title, todos, status }: StatusCardProps) {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const isEditMode = editTodoId !== null;

  const { setNodeRef } = useDroppable({ id });
  const { createTodo, updateTodo, deleteTodo } = useTodoStore();
  const { todoOrderMap, updateTodoOrder } = useTodoOrder();

  const handleChangeTodoText = (todoId: string, text: string) => {
    updateTodo(todoId, { text });
    setEditTodoId(null);
  };

  const handleAddTodo = () => {
    const newTodo = createTodo({ text: '', starred: false }, status);
    setEditTodoId(newTodo.id);
    updateTodoOrder(status, [...todoOrderMap[status], newTodo.id]);
  };

  return (
    <div
      ref={setNodeRef}
      className='flex min-w-[24rem] flex-1 flex-col overflow-hidden rounded-md border border-border px-1 py-5'
    >
      <div className='flex items-center justify-between px-3'>
        <div className='flex items-center gap-3 typo-title-14'>
          <h3>{title}</h3>
          <span className='text-foreground-muted'>{todos.length}</span>
        </div>

        <button
          type='button'
          className='flex size-6 items-center justify-center rounded-full bg-primary-surface'
          onClick={handleAddTodo}
        >
          <Plus className='size-4 text-primary' />
        </button>
      </div>

      <div className='mt-3 flex-1 overflow-hidden'>
        <ScrollArea className='h-full'>
          <div className='mt-6 flex flex-col gap-2 px-4 pb-10'>
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                todo={todo}
                disabled={isEditMode || editTodoId === todo.id}
                editing={editTodoId === todo.id}
                onBlur={() => setEditTodoId(null)}
                onChangeText={handleChangeTodoText}
                onMenuChangeText={setEditTodoId}
                onMenuDelete={deleteTodo}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

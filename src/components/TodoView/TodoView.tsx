'use client';

import { useTodoStore } from '@/store/useTodoStore';
import { useRef } from 'react';
import { useTodo } from '@/hooks/useTodo';
import { AllTodoList } from '@/components/TodoView/AllTodoList';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

export function TodoView() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { currentBoard, currentBoardTodos } = useTodo();

  const createTodo = useTodoStore((state) => state.createTodo);

  const handleEnter = (text: string, starred: boolean) => {
    const boardId = ['all', 'starred'].includes(currentBoard.id)
      ? 'default'
      : currentBoard.id;

    createTodo({
      text,
      starred: currentBoard.id === 'starred' ? true : starred,
      boardId,
    });
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentBoard.id === 'all') return <AllTodoList />;
  return (
    <div className='flex h-full flex-col gap-4 py-6'>
      <div className='px-5'>
        <TodoInput onEnter={handleEnter} />
      </div>

      <div className='flex-1 overflow-hidden'>
        <ScrollArea ref={scrollRef} className='h-full'>
          <TodoList className='mt-2 px-5 pb-10' todos={currentBoardTodos} />
        </ScrollArea>
      </div>
    </div>
  );
}

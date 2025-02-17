'use client';

import { useBoardStore } from '@/store/useBoardStore';
import { useTodoStore } from '@/store/useTodoStore';
import { useRef } from 'react';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

export function TodoView() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const createTodo = useTodoStore((state) => state.createTodo);
  const currentBoard = useBoardStore((state) => state.selectedBoard);

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

  return (
    <div className='flex h-full flex-col gap-4 px-5 py-6'>
      <TodoInput onEnter={handleEnter} />

      <div className='flex-1 overflow-hidden'>
        <TodoList scrollRef={scrollRef} boardId={currentBoard.id} />
      </div>
    </div>
  );
}

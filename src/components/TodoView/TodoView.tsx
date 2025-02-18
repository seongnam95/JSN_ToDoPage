'use client';

import { useTodoStore } from '@/store/useTodoStore';
import { useRef, useState } from 'react';
import { useTodo } from '@/hooks/useTodo';
import { AllTodoList } from '@/components/TodoView/AllTodoList';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useBoardStore } from '@/store/useBoardStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

interface TodoViewProps {
  boardId: string;
  className?: string;
}

export function TodoView({ boardId, className }: TodoViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [moveMode, setMoveMode] = useState(false);

  const { boardTodos, currentBoard } = useTodo({ boardId });
  const createTodo = useTodoStore((state) => state.createTodo);
  const updateBoard = useBoardStore((state) => state.updateBoard);

  const handleEnter = (text: string, starred: boolean) => {
    const newTodo = createTodo({
      text,
      starred: boardId === 'starred' ? true : starred,
      boardId,
    });

    const { boards } = useBoardStore.getState();
    const targetBoard = boards.find((board) => board.id === boardId)!;

    updateBoard(boardId, {
      todoOrder: [newTodo.id, ...(targetBoard.todoOrder || [])],
    });

    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (['list', 'starred'].includes(boardId))
    return <AllTodoList boardId={boardId} />;

  return (
    <div className={cn('flex h-full flex-col gap-4 py-6', className)}>
      <div className='px-5'>
        <TodoInput onEnter={handleEnter} />
      </div>

      <div className='flex-1 overflow-hidden'>
        <div className='mx-4 mt-4 flex justify-end border-b border-border pb-1'>
          <Button
            variant='ghost'
            size='xs'
            className='text-foreground-muted typo-body-14'
            onClick={() => setMoveMode((prev) => !prev)}
          >
            {moveMode ? '완료' : '편집'}
          </Button>
        </div>

        <ScrollArea ref={scrollRef} className='h-full px-5'>
          <TodoList
            className='mt-2 pb-10'
            moveMode={moveMode}
            boardId={boardId}
            order={currentBoard.todoOrder}
            todos={boardTodos}
          />
        </ScrollArea>
      </div>
    </div>
  );
}

'use client';

import { useTodo } from '@/hooks/useTodo';
import { Header, HeaderProps } from '@/components/Header';

interface BoardHeaderProps extends HeaderProps {
  boardId: string;
}

export function BoardHeader({ boardId, ...props }: BoardHeaderProps) {
  const { currentBoard } = useTodo({ boardId });

  const renderTitle = (
    <div className='flex items-center gap-3'>
      {currentBoard.color && (
        <div
          className='size-4 rounded-sm'
          style={{ backgroundColor: currentBoard.color }}
        />
      )}

      <h2 className='typo-title-16'>{currentBoard.name}</h2>
    </div>
  );

  return <Header back title={renderTitle} {...props} />;
}

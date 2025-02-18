'use client';

import { useTodo } from '@/hooks/useTodo';
import { Header, HeaderProps } from '@/components/Header';
import { JSX } from 'react';
import { List, Star, SquareKanban } from 'lucide-react';

interface BoardHeaderProps extends HeaderProps {
  boardId: string;
}

export function BoardHeader({ boardId, ...props }: BoardHeaderProps) {
  const { currentBoard } = useTodo({ boardId });

  const fixedBoardIconMap: Record<string, JSX.Element> = {
    all: <SquareKanban />,
    list: <List />,
    starred: <Star />,
  };

  const renderIcon = fixedBoardIconMap[boardId];

  const renderTitle = (
    <div className='flex items-center gap-2'>
      {currentBoard.color && (
        <div
          className='h-4 w-1.5 rounded-xs'
          style={{ backgroundColor: currentBoard.color }}
        />
      )}

      <div className='[&>svg]:size-5'>{renderIcon}</div>

      <h2 className='typo-title-20'>{currentBoard.name}</h2>
    </div>
  );

  return <Header back title={renderTitle} {...props} />;
}

'use client';

import { useTodo } from '@/hooks/useTodo';
import { Header, HeaderProps } from '@/components/Header';
import { JSX } from 'react';
import { Package, Star } from 'lucide-react';

interface BoardHeaderProps extends HeaderProps {
  boardId: string;
}

export function BoardHeader({ boardId, ...props }: BoardHeaderProps) {
  const { currentBoard } = useTodo({ boardId });

  const fixedBoardIconMap: Record<string, JSX.Element> = {
    all: <Package />,
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

      <div className='[&>svg]:size-4'>{renderIcon}</div>

      <h2 className='typo-title-16'>{currentBoard.name}</h2>
    </div>
  );

  return <Header back title={renderTitle} {...props} />;
}

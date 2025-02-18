'use client';

import { Button } from '@/components/ui/Button';
import { BoardDrawer } from '@/components/BoardDrawer';
import { PanelRight } from 'lucide-react';
import { useTodo } from '@/hooks/useTodo';

export function Header() {
  const { currentBoard } = useTodo();

  return (
    <>
      <header className='fixed left-0 flex h-[8rem] w-full flex-shrink-0 justify-center bg-background max-sm:h-[5.6rem] max-sm:border-b max-sm:border-border'>
        <div className='flex h-full w-full max-w-[90rem] items-center justify-between pl-4 pr-4 max-sm:pr-3'>
          <div className='flex items-center gap-4 px-2 max-sm:gap-3'>
            {currentBoard?.color && (
              <div
                className='h-6 w-2 rounded-xs max-sm:h-5'
                style={{ backgroundColor: currentBoard.color }}
              />
            )}
            <h1 className='typo-title-24 max-sm:typo-title-18'>
              {currentBoard?.name}
            </h1>
          </div>

          <BoardDrawer>
            <Button variant='ghost' size='icon' aria-label='보드 메뉴 열기'>
              <PanelRight className='size-5' />
            </Button>
          </BoardDrawer>
        </div>
      </header>

      {/* 헤더 영역 높이 */}
      <div className='h-[8rem] w-full flex-shrink-0 max-sm:h-[5.6rem]' />
    </>
  );
}

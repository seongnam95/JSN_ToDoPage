'use client';

import { ArrowUpDown, Package, PlusIcon, Star } from 'lucide-react';
import { JSX, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useBoardStore } from '@/store/useBoardStore';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { cn } from '@/lib/cn';
import { useRouter } from 'next/navigation';
import { BoardListItem } from './BoardListItem';

interface BoardListProps {
  className?: string;
}

export function BoardList({ className }: BoardListProps) {
  const [editBoardId, setEditBoardId] = useState<string | null>(null);
  const [moveMode, setMoveMode] = useState(false);
  const isEditMode = editBoardId !== null;

  const {
    boards,
    boardOrder,
    createBoard,
    updateBoard,
    deleteBoard,
    updateBoardOrder,
  } = useBoardStore();
  const router = useRouter();

  const fixedBoards = boards.filter((board) => board.type === 'fixed');
  const userBoards = boards.filter((board) => board.type === 'board');

  const sortedUserBoards = userBoards.sort((a, b) => {
    const aIndex = boardOrder.indexOf(a.id);
    const bIndex = boardOrder.indexOf(b.id);
    return aIndex - bIndex;
  });

  const fixedBoardIconMap: Record<string, JSX.Element> = {
    all: <Package />,
    starred: <Star />,
  };

  /** 새 보드 추가 */
  const handleClickAddBoard = () => {
    const newBoard = createBoard();
    setEditBoardId(newBoard.id);
  };

  /** 보드 이름 변경 */
  const handleChangeBoardName = (boardId: string, name: string) => {
    updateBoard(boardId, { name });
    setEditBoardId(null);
  };

  /** 보드 색상 변경 */
  const handleChangeBoardColor = (boardId: string, color: string) => {
    updateBoard(boardId, { color });
  };

  /** 보드 클릭 */
  const handleBoardClick = (boardId: string) => {
    router.push(`/board/${boardId}`);
  };

  /** 보드 드레그 앤 드랍 순서 변경 */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = userBoards.findIndex((b) => b.id === active.id);
    const newIndex = userBoards.findIndex((b) => b.id === over.id);

    const newOrder = userBoards.map((b) => b.id);
    const [removed] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, removed);

    updateBoardOrder(newOrder);
  };

  return (
    <div className={className}>
      {/* 기본 보드 리스트 */}
      <ul>
        {fixedBoards.map((board) => (
          <BoardListItem
            key={board.id}
            icon={fixedBoardIconMap[board.id]}
            board={board}
            onClick={handleBoardClick}
            disabled={isEditMode}
          />
        ))}
      </ul>

      {/* 사용자 보드 리스트 */}
      <div className='mt-8 flex items-center justify-between pl-2'>
        <p className='text-foreground-muted typo-body-14'>보드</p>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setMoveMode((prev) => !prev)}
        >
          <ArrowUpDown
            className={cn(
              'size-[1.4rem] text-foreground-muted',
              moveMode && 'text-primary'
            )}
          />
        </Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={userBoards.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className='mt-1'>
            {sortedUserBoards.map((board) => {
              const isDefaultBoard = board.id === 'default';

              return (
                <BoardListItem
                  key={board.id}
                  menuEnabled={!isDefaultBoard}
                  moveMode={moveMode}
                  disabled={isEditMode}
                  editing={editBoardId === board.id}
                  onClick={handleBoardClick}
                  onBlur={() => setEditBoardId(null)}
                  onChangeBoardName={handleChangeBoardName}
                  onMenuRename={setEditBoardId}
                  onMenuChangeBoardColor={handleChangeBoardColor}
                  onMenuDeleteBoard={deleteBoard}
                  board={board}
                />
              );
            })}
          </ul>
        </SortableContext>
      </DndContext>

      {/* 새 보드 추가 버튼 */}
      <Button
        variant='ghost'
        className='mt-4 w-full justify-start text-primary'
        size='sm'
        onClick={handleClickAddBoard}
      >
        <PlusIcon className='size-4' />새 보드 추가
      </Button>
    </div>
  );
}

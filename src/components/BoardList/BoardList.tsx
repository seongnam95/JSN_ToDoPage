'use client';

import { Package, PlusIcon, Star } from 'lucide-react';
import { JSX, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useBoardStore } from '@/store/useBoardStore';
import { BoardListItem } from './BoardListItem';

interface BoardListProps {
  className?: string;
}

export function BoardList({ className }: BoardListProps) {
  const [editBoardId, setEditBoardId] = useState<string | null>(null);
  const isEditMode = editBoardId !== null;

  const {
    boards,
    selectedBoardId,
    createBoard,
    updateBoard,
    deleteBoard,
    selectBoard,
  } = useBoardStore();

  const fixedBoards = boards.filter((board) => board.type === 'fixed');
  const userBoards = boards.filter((board) => board.type === 'user');

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

  return (
    <div className={className}>
      {/* 기본 보드 리스트 */}
      <ul>
        {fixedBoards.map((board) => (
          <BoardListItem
            key={board.id}
            icon={fixedBoardIconMap[board.id]}
            board={board}
            onClick={() => selectBoard(board.id)}
            disabled={isEditMode}
            active={selectedBoardId === board.id}
          />
        ))}
      </ul>

      {/* 사용자 보드 리스트 */}
      <p className='mt-8 pl-2 text-foreground-muted typo-body-14'>보드</p>
      <ul className='mt-1'>
        {userBoards.map((board) => {
          const isDefaultBoard = board.id === 'default';

          return (
            <BoardListItem
              key={board.id}
              menuEnabled={!isDefaultBoard}
              disabled={isEditMode}
              editing={editBoardId === board.id}
              active={selectedBoardId === board.id}
              onClick={() => selectBoard(board.id)}
              onBlur={() => setEditBoardId(null)}
              onChangeBoardName={handleChangeBoardName}
              onMenuRename={setEditBoardId}
              onMenuChangeBoardColor={handleChangeBoardColor}
              onMenuDeleteBoard={deleteBoard}
              board={board}
            />
          );
        })}

        {/* 새 보드 추가 버튼 */}
        <Button
          variant='ghost'
          className='mt-4 w-full justify-start text-primary'
          size='sm'
          onClick={handleClickAddBoard}
        >
          <PlusIcon className='size-4' />새 보드 추가
        </Button>
      </ul>
    </div>
  );
}

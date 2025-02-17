'use client';

import { Package, PlusIcon, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useBoardStore } from '@/store/useBoardStore';
import { BoardListItem } from './BoardListItem';

const defaultBoards = [
  { id: 'all', name: '전체', icon: <Package /> },
  { id: 'starred', name: '중요한 일', icon: <Star /> },
];

interface BoardListProps {
  className?: string;
}

export function BoardList({ className }: BoardListProps) {
  const [editBoardId, setEditBoardId] = useState<string | null>(null);
  const isEditMode = editBoardId !== null;

  const {
    boards,
    selectedBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    selectBoard,
  } = useBoardStore();

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
        {defaultBoards.map((board) => (
          <BoardListItem
            key={board.id}
            onClick={() => selectBoard({ id: board.id, name: board.name })}
            disabled={isEditMode}
            active={selectedBoard.id === board.id}
            {...board}
          />
        ))}
      </ul>

      {/* 사용자 보드 리스트 */}
      <p className='mt-8 pl-2 text-foreground-muted typo-body-14'>보드</p>
      <ul className='mt-1'>
        {boards.map((board) => (
          <BoardListItem
            key={board.id}
            menuEnabled
            disabled={isEditMode}
            editing={editBoardId === board.id}
            active={selectedBoard.id === board.id}
            onClick={() => selectBoard(board)}
            onBlur={() => setEditBoardId(null)}
            onChangeBoardName={handleChangeBoardName}
            onMenuRename={setEditBoardId}
            onMenuChangeBoardColor={handleChangeBoardColor}
            onMenuDeleteBoard={deleteBoard}
            {...board}
          />
        ))}

        <BoardListItem
          id='default'
          name='기타'
          color='#C5C5C5'
          disabled={isEditMode}
          active={selectedBoard.id === 'default'}
          onClick={() => selectBoard({ id: 'default', name: '기타' })}
        />

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

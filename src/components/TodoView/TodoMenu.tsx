import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useBoardStore } from '@/store/useBoardStore';

interface TodoMenuProps {
  disabled?: boolean;
  onChangeText?: () => void;
  onChangeBoard?: (moveToBoardId: string) => void;
  onDelete?: () => void;
}

export function TodoMenu({
  disabled,
  onChangeText,
  onChangeBoard,
  onDelete,
}: TodoMenuProps) {
  const boards = useBoardStore((state) => state.boards);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='hover:bg-transparent'
          disabled={disabled}
        >
          <MoreVertical className='size-4 text-foreground-muted' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onChangeText}>
            텍스트 변경
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>이동</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {boards.map((board) => (
                  <DropdownMenuItem
                    key={board.id}
                    onClick={() => onChangeBoard?.(board.id)}
                  >
                    <div
                      className='size-1.5 rounded-full'
                      style={{ backgroundColor: board.color }}
                    />
                    {board.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={onDelete}
            className='text-danger focus:bg-danger-surface'
          >
            삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

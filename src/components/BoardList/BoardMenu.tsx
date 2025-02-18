import { ColorList } from '@/components/ColorList';
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
import { MoreVertical } from 'lucide-react';

interface BoardMenuProps {
  triggerClassName?: string;
  onRename?: () => void;
  onChangeBoardColor?: (color: string) => void;
  onDeleteBoard?: () => void;
}

export function BoardMenu({
  triggerClassName,
  onRename,
  onChangeBoardColor,
  onDeleteBoard,
}: BoardMenuProps) {
  const handleRename = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onRename?.();
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDeleteBoard?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className={triggerClassName}>
          <MoreVertical className='size-5 text-foreground-muted' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleRename}>이름 변경</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>색상 변경</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ColorList onSelectedColor={onChangeBoardColor} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={handleDelete}
            className='text-danger focus:bg-danger-surface'
          >
            삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

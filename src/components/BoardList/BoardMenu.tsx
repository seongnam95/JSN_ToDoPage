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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className={triggerClassName}>
          <MoreVertical className='size-5 text-foreground-muted' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onRename}>이름 변경</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>색상 변경</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ColorList onSelectedColor={onChangeBoardColor} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={onDeleteBoard}
            className='text-danger focus:bg-danger-surface'
          >
            삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

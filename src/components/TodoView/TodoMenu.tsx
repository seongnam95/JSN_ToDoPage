import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

interface TodoMenuProps {
  disabled?: boolean;
  onChangeText?: () => void;
  onDelete?: () => void;
}

export function TodoMenu({ disabled, onChangeText, onDelete }: TodoMenuProps) {
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

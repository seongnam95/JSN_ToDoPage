import { GripHorizontal, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { EditableText } from '@/components/EditableText';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/CheckBox';
import { Todo } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { TodoMenu } from './TodoMenu';

interface TodoListItemProps {
  todo: Todo;
  disabled?: boolean;
  editing?: boolean;
  moveMode?: boolean;
  onBlur?: () => void;
  onChangeChecked?: (todoId: string, completed: boolean) => void;
  onChangeStarred?: (todoId: string, starred: boolean) => void;
  onChangeText?: (todoId: string, text: string) => void;
  onMenuChangeText?: (todoId: string) => void;
  onMenuChangeBoard?: (todoId: string, moveToBoardId: string) => void;
  onMenuDelete?: (todoId: string) => void;
}

export function TodoListItem({
  todo,
  disabled,
  editing,
  moveMode,
  onBlur,
  onChangeChecked,
  onChangeStarred,
  onChangeText,
  onMenuChangeText,
  onMenuChangeBoard,
  onMenuDelete,
}: TodoListItemProps) {
  const { id, text, completed, starred } = todo;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : '',
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      className={cn(
        'relative flex h-11 items-center gap-4 rounded-md py-1 pl-2 pr-1 transition-colors duration-200',
        editing && 'bg-primary-surface',
        !disabled && 'hover:bg-surface'
      )}
      style={style}
      {...(moveMode && { ...attributes, ...listeners })}
    >
      {/* 할 일 체크박스 */}
      <Checkbox
        id={id}
        checked={completed}
        onCheckedChange={() => onChangeChecked?.(id, !completed)}
        disabled={disabled}
      />

      {/* 할 일 텍스트 */}
      <EditableText
        className={cn('flex-1', completed && 'text-foreground-muted/70')}
        text={text}
        editing={editing}
        onBlur={onBlur}
        onEnter={(value) => onChangeText?.(id, value)}
        disabled={disabled}
      />

      {!editing && !moveMode && (
        <div className='flex items-center text-foreground-muted'>
          {/* 즐겨찾기 버튼 */}
          <Button
            variant='ghost'
            size='icon'
            aria-label={starred ? '중요한 일 해제' : '중요한 일에 추가'}
            onClick={() => onChangeStarred?.(id, !starred)}
            disabled={disabled}
          >
            <Star
              className={cn('size-4', starred && 'fill-yellow text-yellow')}
            />
          </Button>

          {/* 메뉴 버튼 */}
          <TodoMenu
            onChangeText={() => onMenuChangeText?.(id)}
            onChangeBoard={(boardId) => onMenuChangeBoard?.(id, boardId)}
            onDelete={() => onMenuDelete?.(id)}
            disabled={disabled}
          />
        </div>
      )}

      {moveMode && (
        <div className='flex size-9 items-center justify-center'>
          <GripHorizontal className='size-4 text-foreground' />
        </div>
      )}
    </li>
  );
}

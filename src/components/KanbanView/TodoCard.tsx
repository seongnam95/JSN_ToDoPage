import { EditableText } from '@/components/EditableText';
import { TodoMenu } from '@/components/TodoView/TodoMenu';
import { cn } from '@/lib/cn';
import { Todo } from '@/types';
import { useSortable } from '@dnd-kit/sortable';

interface TodoCardProps {
  id: string;
  todo: Todo;
  editing?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  onChangeText?: (todoId: string, text: string) => void;
  onMenuChangeText?: (id: string) => void;
  onMenuDelete?: (id: string) => void;
}

export function TodoCard({
  id,
  todo,
  editing,
  disabled,
  onBlur,
  onChangeText,
  onMenuChangeText,
  onMenuDelete,
}: TodoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : '',
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={cn(
          'group relative flex h-10 w-full items-center overflow-hidden text-ellipsis rounded-sm bg-surface px-4 py-2 text-start',
          editing && 'bg-primary-surface'
        )}
      >
        <EditableText
          className='flex-1'
          text={todo.text}
          editing={editing}
          onBlur={onBlur}
          onEnter={(value) => onChangeText?.(id, value)}
          disabled={disabled}
        />

        <TodoMenu
          className='absolute right-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
          onChangeText={() => onMenuChangeText?.(id)}
          onDelete={() => onMenuDelete?.(id)}
        />
      </div>
    </div>
  );
}

import { cn } from '@/lib/cn';

interface EditableTextProps {
  text: string;
  className?: string;
  editing?: boolean;
  disabled?: boolean;
  onEnter?: (value: string) => void;
  onBlur?: () => void;
}

export function EditableText({
  className,
  text,
  editing,
  disabled,
  onEnter,
  onBlur,
}: EditableTextProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.trim() || e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      onEnter?.(e.currentTarget.value);
    }
  };

  return (
    <div className={cn('flex-1', className)}>
      {editing ? (
        <input
          ref={(el) => el?.focus()}
          type='text'
          defaultValue={text}
          className='w-full bg-transparent outline-none'
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className={cn(disabled && 'text-foreground-muted')}>{text}</p>
      )}
    </div>
  );
}

import { Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface TodoInputProps {
  className?: string;
  onEnter?: (text: string, starred: boolean) => void;
}

export function TodoInput({ className, onEnter }: TodoInputProps) {
  const [starred, setStarred] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.trim() || e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      onEnter?.(e.currentTarget.value, starred);

      e.currentTarget.value = '';
      setStarred(false);
    }
  };

  return (
    <div
      className={cn(
        'flex h-12 w-full items-center rounded-md bg-surface pl-5 pr-2 disabled:opacity-50 max-sm:h-10 max-sm:pl-3 max-sm:pr-1',
        className
      )}
    >
      <input
        ref={(el) => el?.focus()}
        className='flex-1 bg-transparent text-base outline-none typo-body-16 placeholder:text-foreground-muted disabled:cursor-not-allowed max-sm:typo-body-14'
        placeholder='새 할일을 추가해 보세요'
        onKeyDown={handleKeyDown}
      />
      <Button
        variant='ghost'
        size='icon'
        onClick={() => setStarred((prev) => !prev)}
      >
        <Star
          className={cn(
            'size-5 text-foreground-muted max-sm:size-4',
            starred && 'fill-yellow text-yellow'
          )}
        />
      </Button>
    </div>
  );
}

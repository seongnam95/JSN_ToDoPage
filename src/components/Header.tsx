'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useRouter } from 'next/navigation';

export interface HeaderProps {
  back?: boolean;
  title?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function Header({ back, title, className, actions }: HeaderProps) {
  const { push } = useRouter();

  return (
    <>
      <header
        className={cn(
          'fixed left-0 flex h-[8rem] w-full flex-shrink-0 justify-center bg-background max-sm:h-[5.6rem] max-sm:border-b max-sm:border-border',
          className
        )}
      >
        <div className='relative flex h-full w-full max-w-[90rem] items-center gap-3 pl-4 pr-4 max-sm:pr-3'>
          {/* 뒤로가기 버튼 */}
          {back && (
            <Button
              variant='ghost'
              size='icon'
              aria-label='뒤로가기'
              onClick={() => push('/')}
            >
              <ArrowLeft className='size-5' />
            </Button>
          )}

          {/* 타이틀 */}
          <div className='absolute left-1/2 top-1/2 flex flex-1 -translate-x-1/2 -translate-y-1/2 items-center typo-title-20'>
            {title}
          </div>

          {/* 액션 버튼 */}
          {actions}
        </div>
      </header>

      {/* 헤더 영역 높이 */}
      <div className='h-[8rem] w-full flex-shrink-0 max-sm:h-[5.6rem]' />
    </>
  );
}

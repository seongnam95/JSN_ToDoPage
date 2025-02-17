import { ChevronsRight } from 'lucide-react';
import { BoardList } from '@/components/BoardList';
import { Button } from '@/components/ui/Button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/Drawer';

interface BoardDrawerProps {
  asChild?: boolean;
  direction?: 'left' | 'right';
  modal?: boolean;
  children?: React.ReactNode;
}

export function BoardDrawer({
  asChild = true,
  direction = 'right',
  modal = true,
  children,
}: BoardDrawerProps) {
  return (
    <Drawer direction={direction} modal={modal}>
      <DrawerTrigger asChild={asChild}>{children}</DrawerTrigger>

      <DrawerContent className='right-0 w-[27rem] max-w-[80%]'>
        <DrawerHeader className='relative flex items-center justify-between'>
          <DrawerTitle>TODO!</DrawerTitle>
          <DrawerClose asChild className='absolute right-2'>
            <Button variant='ghost' size='icon' aria-label='보드 메뉴 닫기'>
              <ChevronsRight className='size-5' />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <nav className='mt-7 flex flex-col gap-7 px-4'>
          <BoardList />
        </nav>
      </DrawerContent>
    </Drawer>
  );
}

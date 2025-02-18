import { BoardList } from '@/components/BoardList';
import { Header } from '@/components/Header';
import { ScrollArea } from '@/components/ui/ScrollArea';

export default function Home() {
  return (
    <>
      <Header title='TODO!' />

      <div className='flex-1 overflow-hidden'>
        <ScrollArea className='h-full px-5'>
          <BoardList className='pb-10 pt-6' />
        </ScrollArea>
      </div>
    </>
  );
}

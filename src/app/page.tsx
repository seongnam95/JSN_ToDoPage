import { BoardList } from '@/components/BoardList';
import { Header } from '@/components/Header';
import { ScrollArea } from '@/components/ui/ScrollArea';

export default function Home() {
  return (
    <div className='mx-auto flex h-screen max-w-[90rem] flex-col'>
      <Header title='TODO!' />

      <div className='flex-1 overflow-hidden'>
        <ScrollArea className='h-full px-5'>
          <BoardList className='pb-10 pt-6' />
        </ScrollArea>
      </div>
    </div>
  );
}

import { BoardList } from '@/components/BoardList';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className='mx-auto flex h-screen max-w-[90rem] flex-col'>
      <Header title='TODO!' />

      <div className='flex-1 overflow-hidden px-5 py-6'>
        <BoardList />
      </div>
    </div>
  );
}

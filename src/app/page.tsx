import { Header } from '@/components/Header';
import { TodoView } from '@/components/TodoView';

export default function Home() {
  return (
    <div className='mx-auto flex h-screen max-w-[90rem] flex-col'>
      <Header />

      <div className='flex-1 overflow-hidden'>
        <TodoView />
      </div>
    </div>
  );
}

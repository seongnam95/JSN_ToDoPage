import { notFound } from 'next/navigation';
import { BoardHeader } from '@/components/BoardHeader';
import { TodoView } from '@/components/TodoView';

type BoardPageProps = {
  params: { id?: string };
};

export default function BoardPage({ params: { id } }: BoardPageProps) {
  if (!id) notFound();
  return (
    <div className='mx-auto flex h-screen max-w-[90rem] flex-col'>
      <BoardHeader boardId={id} back />

      <div className='flex-1 overflow-hidden'>
        <TodoView boardId={id} />
      </div>
    </div>
  );
}

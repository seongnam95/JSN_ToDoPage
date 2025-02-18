import { notFound } from 'next/navigation';
import { BoardHeader } from '@/components/BoardHeader';
import { TodoView } from '@/components/TodoView';

type TodoPageProps = {
  params: { id?: string };
};

export default function TodoPage({ params: { id } }: TodoPageProps) {
  if (!id) notFound();
  return (
    <>
      <BoardHeader boardId={id} back />

      <div className='flex-1 overflow-hidden'>
        <TodoView boardId={id} />
      </div>
    </>
  );
}

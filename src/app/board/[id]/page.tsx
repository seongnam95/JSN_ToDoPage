import { notFound } from 'next/navigation';
import { BoardHeader } from '@/components/BoardHeader';
import { TodoView } from '@/components/TodoView';

interface TodoPageProps {
  params: Promise<{ id: string }>;
}

export default async function TodoPage({ params }: TodoPageProps) {
  const { id } = await params;

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

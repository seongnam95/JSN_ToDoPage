import { Header } from '@/components/Header';
import { KanbanView } from '@/components/KanbanView';

export default function BoardPage() {
  return (
    <div className='flex h-screen flex-col'>
      <Header title='전체' back />
      <KanbanView />
    </div>
  );
}

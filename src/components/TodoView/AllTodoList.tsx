import { useTodo } from '@/hooks/useTodo';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { TodoList } from './TodoList';
import { EmptyTodo } from './EmptyTodo';

export function AllTodoList() {
  const { boardGroups, isEmptyTodo } = useTodo();

  if (isEmptyTodo) return <EmptyTodo />;

  return (
    <div className='flex h-full flex-col gap-4 py-6'>
      <div className='flex-1 overflow-hidden'>
        <ScrollArea className='h-full'>
          {boardGroups.map((board) => (
            <div key={board.id}>
              <div className='flex items-center gap-3 px-6'>
                <div
                  className='h-4 w-1.5 rounded-xs'
                  style={{ backgroundColor: board.color }}
                />
                <h2 className='typo-title-16'>{board.name}</h2>
              </div>
              <TodoList className='mt-1.5 px-5 pb-10' todos={board.todos} />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

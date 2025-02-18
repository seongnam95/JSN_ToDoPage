import { useTodo } from '@/hooks/useTodo';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { TodoList } from './TodoList';
import { EmptyTodo } from './EmptyTodo';

interface AllTodoListProps {
  boardId: string;
}

export function AllTodoList({ boardId }: AllTodoListProps) {
  const { boardGroups } = useTodo({ boardId });

  const groups = boardGroups.filter((group) => {
    const isStarred = boardId === 'starred';
    const todos = isStarred
      ? group.todos.filter((todo) => todo.starred)
      : group.todos;

    return todos.length > 0;
  });

  const isEmptyTodo = groups.every((group) => group.todos.length === 0);

  if (isEmptyTodo) return <EmptyTodo />;

  return (
    <div className='flex h-full flex-col gap-4 py-6'>
      <div className='flex-1 overflow-hidden'>
        <ScrollArea className='h-full'>
          {groups.map((board) => {
            const isStarred = boardId === 'starred';
            const todos = isStarred
              ? board.todos.filter((todo) => todo.starred)
              : board.todos;

            return (
              <div key={board.id}>
                <div className='flex items-center gap-3 px-6'>
                  <div
                    className='h-4 w-1.5 rounded-xs'
                    style={{ backgroundColor: board.color }}
                  />
                  <h2 className='typo-title-16'>{board.name}</h2>
                </div>
                <TodoList
                  className='mt-1.5 px-5 pb-10'
                  order={board.todoOrder}
                  todos={todos}
                />
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
}

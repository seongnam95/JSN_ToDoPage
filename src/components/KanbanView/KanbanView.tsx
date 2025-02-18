'use client';

import { Status, STATUS, Todo } from '@/types';
import { StatusCard } from '@/components/KanbanView/StatusCard';
import { useTodoStore } from '@/store/useTodoStore';
import {
  Active,
  closestCenter,
  DndContext,
  DragOverlay,
  Over,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { useTodoOrder } from '@/store/useTodoOrder';

interface TodoGroup {
  [key: string]: Todo[];
}

export function KanbanView() {
  const { todos, updateTodoStatus } = useTodoStore();
  const { todoOrderMap, updateTodoOrder } = useTodoOrder();

  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const todoGroup = todos.reduce<TodoGroup>(
    (acc, targetTodo) => {
      acc[targetTodo.status].push(targetTodo);
      return acc;
    },
    { todo: [], inProgress: [], done: [] }
  );

  const sortedTodoGroup: TodoGroup = {
    todo: todoOrderMap.todo
      .map((id) => todoGroup.todo.find((t) => t.id === id))
      .filter((t): t is Todo => t !== undefined)
      .concat(todoGroup.todo.filter((t) => !todoOrderMap.todo.includes(t.id))),
    inProgress: todoOrderMap.inProgress
      .map((id) => todoGroup.inProgress.find((t) => t.id === id))
      .filter((t): t is Todo => t !== undefined)
      .concat(
        todoGroup.inProgress.filter(
          (t) => !todoOrderMap.inProgress.includes(t.id)
        )
      ),
    done: todoOrderMap.done
      .map((id) => todoGroup.done.find((t) => t.id === id))
      .filter((t): t is Todo => t !== undefined)
      .concat(todoGroup.done.filter((t) => !todoOrderMap.done.includes(t.id))),
  };

  const handleDragStart = ({ active }: { active: Active }) => {
    setActiveTodo(todos.find((t) => t.id === active.id) ?? null);
  };

  const handleDragEnd = ({
    active,
    over,
  }: {
    active: Active;
    over: Over | null;
  }) => {
    setActiveTodo(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // 같은 컬럼 내에서의 순서 변경
    const activeStatus = todos.find((t) => t.id === activeId)?.status;
    const overStatus = isValidStatus(over.id as string)
      ? (over.id as Status)
      : (over.data.current?.sortable?.containerId as Status);

    if (activeStatus === overStatus) {
      // 같은 컬럼 내 순서 변경
      const oldIndex = sortedTodoGroup[activeStatus].findIndex(
        (t) => t.id === activeId
      );
      const newIndex = sortedTodoGroup[activeStatus].findIndex(
        (t) => t.id === overId
      );

      const newOrder = [...todoOrderMap[activeStatus]];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, activeId);
      updateTodoOrder(activeStatus, newOrder);
    } else {
      // 다른 컬럼으로 이동
      updateTodoStatus(activeId, overStatus);

      // 이전 컬럼에서 제거
      if (activeStatus) {
        const oldOrder = todoOrderMap[activeStatus].filter(
          (id) => id !== activeId
        );
        updateTodoOrder(activeStatus, oldOrder);
      }

      // 새 컬럼에 추가
      const targetIndex = sortedTodoGroup[overStatus].findIndex(
        (t) => t.id === overId
      );
      const newOrder = [...todoOrderMap[overStatus]];
      newOrder.splice(
        targetIndex >= 0 ? targetIndex : newOrder.length,
        0,
        activeId
      );
      updateTodoOrder(overStatus, newOrder);
    }
  };

  const isValidStatus = (status: string): status is Status => {
    return Object.keys(STATUS).includes(status);
  };

  return (
    <div className='mt-4 flex w-full flex-1 flex-col gap-4 overflow-hidden'>
      <div className='h-full w-full overflow-auto'>
        <div className='flex h-full gap-4 pb-8'>
          <DndContext
            collisionDetection={closestCenter}
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {(Object.entries(STATUS) as [Status, string][]).map(
              ([key, value]) => (
                <SortableContext
                  key={key}
                  id={key}
                  items={todoGroup[key].map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <StatusCard
                    id={key}
                    title={value}
                    todos={sortedTodoGroup[key]}
                    status={key}
                  />
                </SortableContext>
              )
            )}
            <DragOverlay>
              {activeTodo && (
                <div className='w-[24rem] overflow-hidden text-ellipsis rounded-md bg-surface px-4 py-2 text-start'>
                  {activeTodo.text}
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

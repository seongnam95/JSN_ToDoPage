import { cn } from '@/lib/cn';
import { Board } from '@/types';

import { EditableText } from '@/components/EditableText';
import { BoardMenu } from './BoardMenu';

interface BoardItemProps extends Board {
  icon?: React.ReactNode;
  menuEnabled?: boolean;
  active?: boolean;
  editing?: boolean;
  disabled?: boolean;
  onClick?: (id: string) => void;
  onBlur?: () => void;
  onChangeBoardName?: (id: string, name: string) => void;
  onMenuRename?: (id: string) => void;
  onMenuDeleteBoard?: (id: string) => void;
  onMenuChangeBoardColor?: (id: string, color: string) => void;
}

export function BoardListItem({
  id,
  name,
  color,
  icon,
  menuEnabled = false,
  active,
  editing,
  disabled,
  onClick,
  onBlur,
  onChangeBoardName,
  onMenuRename,
  onMenuChangeBoardColor,
  onMenuDeleteBoard,
}: BoardItemProps) {
  return (
    <li>
      <div
        className={cn(
          'group relative flex h-10 w-full items-center gap-3 rounded-md px-3 transition-all duration-200',
          active && 'bg-surface typo-title-16',
          editing && 'bg-primary-surface',
          !disabled && 'hover:bg-surface'
        )}
        tabIndex={0}
        role='button'
        onClick={() => onClick?.(id)}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.(id)}
      >
        {/* 아이콘 */}
        {icon && (
          <div
            className={cn(
              '[&>svg]:size-4',
              disabled && 'text-foreground-muted'
            )}
          >
            {icon}
          </div>
        )}

        {/* 컬러 뱃지 */}
        {color && (
          <div
            className='size-[6px] rounded-sm'
            style={{ backgroundColor: color }}
          />
        )}

        {/* 보드 이름 */}
        <EditableText
          className='flex-1'
          text={name}
          editing={editing}
          onBlur={onBlur}
          onEnter={(value) => onChangeBoardName?.(id, value)}
          disabled={disabled}
        />

        {/* 메뉴 버튼 */}
        {menuEnabled && !editing && (
          <BoardMenu
            triggerClassName={cn(
              'absolute right-0 opacity-0 transition-opacity duration-200 ',
              !disabled && 'group-hover:opacity-100'
            )}
            onRename={() => onMenuRename?.(id)}
            onDeleteBoard={() => onMenuDeleteBoard?.(id)}
            onChangeBoardColor={(activeColor) =>
              onMenuChangeBoardColor?.(id, activeColor)
            }
          />
        )}
      </div>
    </li>
  );
}

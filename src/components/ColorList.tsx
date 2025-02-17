export const boardColors = [
  '#9198FC',
  '#93F071',
  '#BF74F5',
  '#F0AEFC',
  '#F07171',
  '#F3A517',
  '#FEE124',
  '#C5C5C5',
];

interface ColorListProps {
  onSelectedColor?: (color: string) => void;
}

export function ColorList({ onSelectedColor }: ColorListProps) {
  return (
    <div className='grid grid-cols-4 gap-3 p-2'>
      {boardColors.map((color) => (
        <button
          key={color}
          type='button'
          className='size-6 rounded-sm transition-all duration-200 hover:scale-110'
          style={{ backgroundColor: color }}
          onClick={() => onSelectedColor?.(color)}
          aria-label={`색상 선택: ${color}`}
        />
      ))}
    </div>
  );
}

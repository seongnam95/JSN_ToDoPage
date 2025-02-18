import Lottie from 'react-lottie-player';
import EmptyLottie from '@/assets/lotties/empty.json';

export function EmptyTodo() {
  return (
    <div className='flex h-full flex-col items-center gap-4'>
      <Lottie className='mt-10 size-[300px]' play animationData={EmptyLottie} />
      <div className='-mt-8 flex flex-col items-center gap-3'>
        <h2 className='typo-title-24'>텅- 고요하네요.</h2>
        <p className='text-center text-foreground-muted typo-body-14'>
          우측 상단 메뉴를 눌러 보드를 선택해 <br />첫 번째 할 일을 추가해
          보세요
        </p>
      </div>
    </div>
  );
}

import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: './Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
    {
      path: './Pretendard-Bold.subset.woff2',
      weight: '700',
    },
  ],
  variable: '--pretendard',
  display: 'swap',
  weight: '400',
});

import type { Metadata } from 'next';

import { cn } from '@/lib/cn';
import { pretendard } from '@/assets/fonts';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SouthStar - TODO!',
  description: '글로벌널리지 사전 과제',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          pretendard.variable,
          'bg-background font-pretendard text-foreground antialiased typo-body-16'
        )}
      >
        <div className='mx-auto flex h-screen max-w-[90rem] flex-col'>
          {children}
        </div>
      </body>
    </html>
  );
}

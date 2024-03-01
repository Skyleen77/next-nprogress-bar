'use client';

import { useProgress } from '@/context/progress-context';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { color, height, showSpinner } = useProgress();

  return (
    <>
      {children}
      <ProgressBar
        height={height}
        color={color}
        options={{ showSpinner }}
        shouldCompareComplexProps
      />
    </>
  );
};

export default Providers;

'use client';

import {
  AppProgressBar as ProgressBar,
  ProgressBarProvider,
} from 'next-nprogress-bar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressBarProvider>
      {children}
      <ProgressBar
        height="4px"
        color="currentColor"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ProgressBarProvider>
  );
};

export default Providers;

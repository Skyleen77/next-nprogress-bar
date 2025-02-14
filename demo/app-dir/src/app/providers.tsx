'use client';

// import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { AppProgressBar as ProgressBar } from '../../../../dist';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#0A2FFF"
        options={{ showSpinner: true, direction: 'rtl' }}
        spinnerPosition="bottom-right"
        // shallowRouting
        // startPosition={0.3}
        stopDelay={1000}
        disableSameURL
        // startOnLoad
      />
    </>
  );
};

export default Providers;

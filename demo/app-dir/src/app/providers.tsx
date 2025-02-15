'use client';

// import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import {
  Progress,
  AppProgressBar as ProgressBar,
  ProgressBarProvider,
} from '../../../../dist';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressBarProvider>
      {children}
      <ProgressBar
        height="4px"
        color="#0A2FFF"
        options={{
          showSpinner: true,
          direction: 'rtl',
          template: null,
          positionUsing: 'width',
        }}
        spinnerPosition="top-right"
        stopDelay={1000}
        disableSameURL
      />

      <div className="fixed top-4 overflow-hidden inset-x-4 rounded-lg bg-neutral-100 h-10">
        <Progress>
          <Progress.Bar className="!absolute z-[9999] !bottom-0 !top-auto"></Progress.Bar>
          <Progress.Spinner className="!top-16">
            <Progress.SpinnerIcon />
          </Progress.Spinner>
        </Progress>
      </div>
    </ProgressBarProvider>
  );
};

export default Providers;

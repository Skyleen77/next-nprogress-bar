'use client';

import ProgressBar from '../../../../dist';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#29D"
        options={{ showSpinner: false }}
        shallowRouting
        appDirectory
      />
    </>
  );
};

export default Providers;

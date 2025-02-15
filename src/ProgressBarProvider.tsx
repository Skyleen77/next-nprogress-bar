import { NProgress, NProgressOptions } from 'nprogress-v2';
import React, { createContext, useCallback, useContext } from 'react';
import { ProgressBarContextValue } from '.';

const ProgressBarContext = createContext<ProgressBarContextValue | undefined>(
  undefined,
);

export const useProgressBar = (): ProgressBarContextValue => {
  const context = useContext(ProgressBarContext);
  if (!context) {
    throw new Error('useProgressBar must be used within a ProgressBarProvider');
  }
  return context;
};

interface ProgressBarProviderProps {
  children?: React.ReactNode;
}

export const ProgressBarProvider = ({ children }: ProgressBarProviderProps) => {
  const start = useCallback(() => {
    NProgress.start();
  }, []);

  const stop = useCallback(() => {
    NProgress.done();
  }, []);

  const inc = useCallback((amount?: number) => {
    NProgress.inc(amount);
  }, []);

  const set = useCallback((n: number) => {
    NProgress.set(n);
  }, []);

  const pause = useCallback(() => {
    NProgress.pause();
  }, []);

  const resume = useCallback(() => {
    NProgress.resume();
  }, []);

  const setOptions = useCallback(
    (options: Partial<NProgressOptions>) => {
      NProgress.configure(options);
    },
    [NProgress],
  );

  const getOptions = useCallback(() => {
    return NProgress.settings;
  }, [NProgress]);

  return (
    <ProgressBarContext.Provider
      value={{ start, stop, inc, set, pause, resume, setOptions, getOptions }}
    >
      {children}
    </ProgressBarContext.Provider>
  );
};

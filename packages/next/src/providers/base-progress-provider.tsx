import { BProgress, type BProgressOptions } from '@bprogress/core';
import React, { createContext, useCallback, useContext } from 'react';
import type { ProgressContextValue } from '..';
import type { BaseProgressProviderProps } from '../types';

const BaseProgressContext = createContext<ProgressContextValue | undefined>(
  undefined,
);

export const useProgress = (): ProgressContextValue => {
  const context = useContext(BaseProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const BaseProgressProvider = ({
  children,
}: BaseProgressProviderProps) => {
  const start = useCallback(() => {
    BProgress.start();
  }, []);

  const stop = useCallback(() => {
    BProgress.done();
  }, []);

  const inc = useCallback((amount?: number) => {
    BProgress.inc(amount);
  }, []);

  const set = useCallback((n: number) => {
    BProgress.set(n);
  }, []);

  const pause = useCallback(() => {
    BProgress.pause();
  }, []);

  const resume = useCallback(() => {
    BProgress.resume();
  }, []);

  const getOptions = useCallback(() => {
    return BProgress.settings;
  }, [BProgress]);

  const setOptions = useCallback(
    (
      newOptions:
        | Partial<BProgressOptions>
        | ((prevOptions: BProgressOptions) => Partial<BProgressOptions>),
    ) => {
      const currentOptions = getOptions();
      const updates =
        typeof newOptions === 'function'
          ? newOptions(currentOptions)
          : newOptions;
      const nextOptions = { ...currentOptions, ...updates };
      BProgress.configure(nextOptions);
    },
    [getOptions],
  );

  return (
    <BaseProgressContext.Provider
      value={{ start, stop, inc, set, pause, resume, setOptions, getOptions }}
    >
      {children}
    </BaseProgressContext.Provider>
  );
};

import { BProgress, type BProgressOptions } from '@bprogress/core';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { css } from '../utils/css';
import type { ProgressContextValue } from '..';
import type { ProgressProviderProps } from '../types';

const ProgressContext = createContext<ProgressContextValue | undefined>(
  undefined,
);

export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({
  children,
  color = '#0A2FFF',
  height = '2px',
  options,
  spinnerPosition = 'top-right',
  style,
  disableStyle = false,
  nonce,
}: ProgressProviderProps) => {
  const start = useCallback(() => BProgress.start(), []);
  const stop = useCallback(() => BProgress.done(), []);
  const inc = useCallback((amount?: number) => BProgress.inc(amount), []);
  const set = useCallback((n: number) => BProgress.set(n), []);
  const pause = useCallback(() => BProgress.pause(), []);
  const resume = useCallback(() => BProgress.resume(), []);
  const getOptions = useCallback(() => BProgress.settings, [BProgress]);
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

  const styles = useMemo(
    () => (
      <style nonce={nonce}>
        {style ||
          css({
            color,
            height,
            spinnerPosition,
          })}
      </style>
    ),
    [color, height, nonce, spinnerPosition],
  );

  BProgress.configure(options || {});

  return (
    <ProgressContext.Provider
      value={{ start, stop, inc, set, pause, resume, setOptions, getOptions }}
    >
      {!disableStyle ? styles : null}
      {children}
    </ProgressContext.Provider>
  );
};

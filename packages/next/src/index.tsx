import type { BProgressOptions } from '@bprogress/core';
import { useRouter } from './components/app-progress';
import type {
  SpinnerPosition,
  AppProgressProps,
  PagesProgressProps,
  ProgressContextValue,
  RouterActionsProgressOptions,
  RouterProgressOptions,
  ProgressComponentProps,
  AppProgressProviderProps,
  PagesProgressProviderProps,
} from './types';

export { useRouter };
export { useProgress } from './providers/base-progress-provider';
export { AppProgressProvider } from './providers/app-progress-provider';
export { PagesProgressProvider } from './providers/pages-progress-provider';
export * from './components/progress';
export type {
  BProgressOptions,
  SpinnerPosition,
  AppProgressProps,
  PagesProgressProps,
  ProgressContextValue,
  RouterActionsProgressOptions,
  RouterProgressOptions,
  ProgressComponentProps,
  AppProgressProviderProps,
  PagesProgressProviderProps,
};

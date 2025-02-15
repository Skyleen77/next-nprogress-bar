import { NProgressOptions } from 'nprogress-v2';
import {
  AppProgressBar as AppProgressBarComponent,
  useRouter,
} from './AppProgressBar';
import withSuspense from './WithSuspense';
import React from 'react';

export type SpinnerPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/**
 * @param color Color of the progress bar. @default #0A2FFF
 * @param height Height of the progress bar. @default 2px
 * @param options NProgress options. @default undefined
 * @param spinnerPosition Position of the spinner. @default top-right
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - @default false
 * @param startPosition The position of the progress bar at the start of the page load - @default 0
 * @param delay When the page loads faster than the progress bar, it does not display - @default 0
 * @param stopDelay Delay to stop the progress bar - @default 0
 * @param style Custom css - @default undefined
 * @param disableStyle Disable default css - @default false
 * @param nonce Custom nonce for Content-Security-Policy directives - @default undefined
 * @param shouldCompareComplexProps If you want to compare props in the React.memo return - @default false
 * @param disableSameURL Disable triggering progress bar on the same URL - @default true
 */
export interface BaseProgressBarProps {
  color?: string;
  height?: string;
  options?: Partial<NProgressOptions>;
  spinnerPosition?: SpinnerPosition;
  shallowRouting?: boolean;
  disableSameURL?: boolean;
  startPosition?: number;
  delay?: number;
  stopDelay?: number;
  style?: string;
  disableStyle?: boolean;
  nonce?: string;
  memo?: boolean;
  shouldCompareComplexProps?: boolean;
}

/**
 * @param start Start the progress bar
 * @param done Stop the progress bar
 * @param inc Increase the progress Bar
 * @param set Set the progress bar to a specific value
 * @param pause Pause the progress bar
 * @param resume Resume the progress bar
 * @param setOptions Set the NProgress options
 * @param getOptions Get the NProgress options
 */
export interface ProgressBarContextValue {
  start: () => void;
  stop: () => void;
  inc: (amount?: number) => void;
  set: (n: number) => void;
  pause: () => void;
  resume: () => void;
  setOptions: (options: Partial<NProgressOptions>) => void;
  getOptions: () => NProgressOptions;
}

export interface PagesProgressBarProps extends BaseProgressBarProps {}

/**
 * @param targetPreprocessor If you want to./AppProgressBaress the target URL - @default undefined
 * @param disableAnchorClick Disable triggering progress bar on anchor clicks - @default false
 * @param startOnLoad Start the progress bar on page load - @default false
 */
export interface AppProgressBarProps extends BaseProgressBarProps {
  targetPreprocessor?: (url: URL) => URL;
  disableAnchorClick?: boolean;
  startOnLoad?: boolean;
}

/**
 * @param showProgressBar Show the progress bar. @default true
 * @param startPosition The position of the progress bar at the start of the page load - @default 0
 * @param disableSameURL Disable triggering progress bar on the same URL - @default true
 */
export interface RouterNProgressOptions {
  showProgressBar?: boolean;
  startPosition?: number;
  disableSameURL?: boolean;
}

/**
 * @param as Custom component - @default div
 * @param children Children - @default undefined
 * @param className Custom class - @default undefined
 */
export type ProgressComponentProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const AppProgressBar = withSuspense<AppProgressBarProps>(
  AppProgressBarComponent,
);
export { AppProgressBar, useRouter, NProgressOptions };
export { PagesProgressBar } from './PagesProgressBar';
export { ProgressBarProvider, useProgressBar } from './ProgressBarProvider';
export * from './Components';

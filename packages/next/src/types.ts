import type { BProgressOptions } from '@bprogress/core';

export type SpinnerPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/**
 * @param color Color of the progress bar. @default #0A2FFF
 * @param height Height of the progress bar. @default 2px
 * @param options BProgress options. @default undefined
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
export interface BaseProgressProps {
  color?: string;
  height?: string;
  options?: Partial<BProgressOptions>;
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
 * @param setOptions Set the BProgress options
 * @param getOptions Get the BProgress options
 */
export interface ProgressContextValue {
  start: () => void;
  stop: () => void;
  inc: (amount?: number) => void;
  set: (n: number) => void;
  pause: () => void;
  resume: () => void;
  setOptions: (
    options:
      | Partial<BProgressOptions>
      | ((prevOptions: BProgressOptions) => Partial<BProgressOptions>),
  ) => void;
  getOptions: () => BProgressOptions;
}

export interface PagesProgressProps extends BaseProgressProps {}

/**
 * @param targetPreprocessor If you want to./AppProgressBaress the target URL - @default undefined
 * @param disableAnchorClick Disable triggering progress bar on anchor clicks - @default false
 * @param startOnLoad Start the progress bar on page load - @default false
 */
export interface AppProgressProps extends BaseProgressProps {
  targetPreprocessor?: (url: URL) => URL;
  disableAnchorClick?: boolean;
  startOnLoad?: boolean;
}

/**
 * @param showProgress Show the progress bar. @default true
 * @param startPosition The position of the progress bar at the start of the page load - @default 0
 * @param disableSameURL Disable triggering progress bar on the same URL - @default true
 */
export interface RouterBProgressOptions {
  showProgress?: boolean;
  startPosition?: number;
  disableSameURL?: boolean;
  basePath?: string;
}

/**
 * @param as Custom component - @default div
 * @param children Children - @default undefined
 * @param className Custom class - @default undefined
 * @param classSelector Custom class selector - @default undefined
 * @param role Custom role - @default undefined
 */
export type ProgressComponentProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children?: React.ReactNode;
  classSelector?: string;
  role?: string;
} & React.ComponentPropsWithoutRef<T>;

/**
 * @param children Children - @default undefined
 */
export interface BaseProgressProviderProps {
  children?: React.ReactNode;
}

export interface AppProgressProviderProps
  extends BaseProgressProviderProps,
    AppProgressProps {}

export interface PagesProgressProviderProps
  extends BaseProgressProviderProps,
    PagesProgressProps {}

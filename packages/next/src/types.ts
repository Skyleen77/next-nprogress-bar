import type { ProgressProviderProps } from '@bprogress/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - @default false
 * @param startPosition The position of the progress bar at the start of the page load - @default 0
 * @param delay When the page loads faster than the progress bar, it does not display - @default 0
 * @param stopDelay Delay to stop the progress bar - @default 0
 * @param shouldCompareComplexProps If you want to compare props in the React.memo return - @default false
 * @param disableSameURL Disable triggering progress bar on the same URL - @default true
 */
export interface NextProgressProps extends ProgressProviderProps {
  shallowRouting?: boolean;
  disableSameURL?: boolean;
  startPosition?: number;
  delay?: number;
  stopDelay?: number;
  memo?: boolean;
  shouldCompareComplexProps?: boolean;
}

export interface PagesProgressProps extends NextProgressProps {}

/**
 * @param targetPreprocessor If you want to./AppProgressBaress the target URL - @default undefined
 * @param disableAnchorClick Disable triggering progress bar on anchor clicks - @default false
 * @param startOnLoad Start the progress bar on page load - @default false
 */
export interface AppProgressProps extends NextProgressProps {
  targetPreprocessor?: (url: URL) => URL;
  disableAnchorClick?: boolean;
  startOnLoad?: boolean;
}

/**
 * @param showProgress Show the progress bar. @default true
 * @param startPosition The position of the progress bar at the start of the page load - @default 0
 * @param disableSameURL Disable triggering progress bar on the same URL - @default true
 * @param basePath Base path for the progress bar - @default ''
 */
export interface RouterActionsProgressOptions {
  showProgress?: boolean;
  startPosition?: number;
  disableSameURL?: boolean;
  basePath?: string;
}

/**
 * @param customRouter Custom router - @default undefined
 */
export interface RouterProgressOptions extends RouterActionsProgressOptions {
  customRouter?: () => AppRouterInstance;
}

export interface AppProgressProviderProps extends AppProgressProps {}

export interface PagesProgressProviderProps extends PagesProgressProps {}

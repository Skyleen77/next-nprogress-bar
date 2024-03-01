import {
  AppProgressBar as AppProgressBarComponent,
  useRouter,
} from './AppProgressBar';
import withSuspense from './WithSuspense';

export interface NProgressOptions {
  minimum?: number;
  template?: string;
  easing?: string;
  speed?: number;
  trickle?: boolean;
  trickleSpeed?: number;
  showSpinner?: boolean;
  parent?: string;
  positionUsing?: string;
  barSelector?: string;
  spinnerSelector?: string;
}

export interface ProgressBarProps {
  color?: string;
  height?: string;
  options?: Partial<NProgressOptions>;
  shallowRouting?: boolean;
  startPosition?: number;
  delay?: number;
  style?: string;
  shouldCompareComplexProps?: boolean;
  targetPreprocessor?: (url: URL) => URL;
}

export interface RouterNProgressOptions {
  showProgressBar?: boolean;
  startPosition?: number;
}

/**
 * @param color Color of the progress bar. @default #0A2FFF
 * @param height Height of the progress bar. @default 2px
 * @param options NProgress options. @default undefined
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - @default false
 * @param startPosition The position of the progress bar at the start of the page load - @default 0
 * @param delay When the page loads faster than the progress bar, it does not display - @default 0
 * @param style Custom css - @default undefined
 * @param shouldCompareComplexProps If you want to compare props in the React.memo return - @default false
 * @param targetPreprocessor If you want to./AppProgressBaress the target URL - @default undefined
 */

const AppProgressBar = withSuspense(AppProgressBarComponent);
export { AppProgressBar, useRouter };
export { PagesProgressBar } from './PagesProgressBar';

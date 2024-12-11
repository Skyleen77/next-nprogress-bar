/// <reference types="react" />
import { NProgressOptions } from 'nprogress-v2';
import { useRouter } from './AppProgressBar';
export type SpinnerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
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
 * @param nonce Custom nonce for Content-Security-Policy directives - @default undefined
 * @param shouldCompareComplexProps If you want to compare props in the React.memo return - @default false
 * @param targetPreprocessor If you want to./AppProgressBaress the target URL - @default undefined
 * @param disableAnchorClick Disable triggering progress bar on anchor clicks - @default false
 * @param disableSameURL Disable triggering progress bar on the same URL - @default true
 */
export interface ProgressBarProps {
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
    nonce?: string;
    memo?: boolean;
    shouldCompareComplexProps?: boolean;
    targetPreprocessor?: (url: URL) => URL;
    disableAnchorClick?: boolean;
}
export interface RouterNProgressOptions {
    showProgressBar?: boolean;
    startPosition?: number;
    disableSameURL?: boolean;
}
export declare const startProgress: () => void;
export declare const stopProgress: (force?: boolean) => void;
declare const AppProgressBar: (props: ProgressBarProps) => import("react").JSX.Element;
export { AppProgressBar, useRouter, NProgressOptions };
export { PagesProgressBar } from './PagesProgressBar';

import React from 'react';
import { NProgressOptions } from 'nprogress';
interface ProgressBarProps {
    color?: string;
    height?: string;
    options?: Partial<NProgressOptions>;
    appDirectory?: boolean;
    shallowRouting?: boolean;
    delay?: number;
    style?: string;
}
/**
 * @param color Color of the progress bar. @default #0A2FFF
 * @param height Height of the progress bar. @default 2px
 * @param options NProgress options. @default undefined
 * @param appDirectory If your are in the app directory - @default false
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - @default false
 * @param delay When the page loads faster than the progress bar, it does not display - @default 0
 * @param style Custom css - @default undefined
 */
declare const ProgressBar: React.MemoExoticComponent<({ color, height, options, appDirectory, shallowRouting, delay, style, }: ProgressBarProps) => React.JSX.Element>;
export default ProgressBar;

import React from 'react';
import { NProgressOptions } from 'nprogress';
interface ProgressBarProps {
    color?: string;
    height?: string;
    options?: Partial<NProgressOptions>;
    appDirectory?: boolean;
    shallowRouting?: boolean;
}
/**
 * @param color Color of the progress bar.
 * @param height Height of the progress bar.
 * @param options NProgress options.
 * @param appDirectory If your are in the app directory - false by default
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - false by default
 */
declare const ProgressBar: React.MemoExoticComponent<({ color, height, options, appDirectory, shallowRouting, }: ProgressBarProps) => React.JSX.Element>;
export default ProgressBar;

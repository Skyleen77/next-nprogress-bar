import React from 'react';
import { ProgressBarProps, RouterNProgressOptions } from '.';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
export declare const AppProgressBar: React.MemoExoticComponent<({ color, height, options, shallowRouting, startPosition, delay, style, targetPreprocessor, }: ProgressBarProps) => React.JSX.Element>;
export declare function useRouter(): {
    push: (href: string, options?: NavigateOptions, NProgressOptions?: RouterNProgressOptions) => void;
    replace: (href: string, options?: NavigateOptions, NProgressOptions?: RouterNProgressOptions) => void;
    back: (NProgressOptions?: RouterNProgressOptions) => void;
    forward(): void;
    refresh(): void;
    prefetch(href: string, options?: import("next/dist/shared/lib/app-router-context.shared-runtime").PrefetchOptions | undefined): void;
};

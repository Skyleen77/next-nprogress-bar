import React from 'react';
import { ProgressBarProps } from '.';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
export declare const AppProgressBar: React.MemoExoticComponent<({ color, height, options, shallowRouting, delay, style, }: ProgressBarProps) => React.JSX.Element>;
export declare function useRouter(): {
    push: (href: string, options?: NavigateOptions, NProgressOptions?: {
        showProgressBar?: boolean;
    }) => void;
    back: (NProgressOptions?: {
        showProgressBar?: boolean;
    }) => void;
    forward(): void;
    refresh(): void;
    replace(href: string, options?: NavigateOptions | undefined): void;
    prefetch(href: string, options?: import("next/dist/shared/lib/app-router-context").PrefetchOptions | undefined): void;
};

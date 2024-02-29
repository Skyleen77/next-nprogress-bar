import React from 'react';
import { ProgressBarProps } from '.';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
export declare const AppProgressBar: (props: ProgressBarProps) => React.JSX.Element;
export declare function useRouter(): {
    push: (href: string, options?: NavigateOptions, NProgressOptions?: {
        showProgressBar?: boolean;
    }) => void;
    replace: (href: string, options?: NavigateOptions, NProgressOptions?: {
        showProgressBar?: boolean;
    }) => void;
    back: (NProgressOptions?: {
        showProgressBar?: boolean;
    }) => void;
    forward(): void;
    refresh(): void;
    prefetch(href: string, options?: import("next/dist/shared/lib/app-router-context").PrefetchOptions | undefined): void;
};

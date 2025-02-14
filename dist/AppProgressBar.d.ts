import React from 'react';
import type { AppProgressBarProps, RouterNProgressOptions } from '.';
import { type AppRouterInstance, NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
export declare const AppProgressBar: React.MemoExoticComponent<({ color, height, options, spinnerPosition, shallowRouting, disableSameURL, startPosition, delay, stopDelay, style, disableStyle, nonce, targetPreprocessor, disableAnchorClick, startOnLoad, }: AppProgressBarProps) => React.JSX.Element | null>;
export declare function useRouter(customRouter?: () => AppRouterInstance): {
    push: (href: string, options?: NavigateOptions, NProgressOptions?: RouterNProgressOptions) => void;
    replace: (href: string, options?: NavigateOptions, NProgressOptions?: RouterNProgressOptions) => void;
    back: (NProgressOptions?: RouterNProgressOptions) => void;
    refresh: (NProgressOptions?: RouterNProgressOptions) => void;
    forward(): void;
    prefetch(href: string, options?: import("next/dist/shared/lib/app-router-context.shared-runtime").PrefetchOptions | undefined): void;
};

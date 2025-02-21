import { useCallback, useMemo } from 'react';
import { BProgress } from '@bprogress/core';
import { isSameURL } from '@bprogress/react';
import { useRouter as useNextRouter } from 'next/navigation';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type {
  RouterActionsProgressOptions,
  RouterProgressOptions,
} from '../types';

export function useRouter(options?: RouterProgressOptions) {
  const { customRouter, ...defaultProgressOptions } = options || {};

  const useSelectedRouter = useCallback(() => {
    if (customRouter) return customRouter();
    return useNextRouter();
  }, [customRouter]);

  const router = useSelectedRouter();

  const startProgress = useCallback((startPosition?: number) => {
    if (startPosition && startPosition > 0) BProgress.set(startPosition);
    BProgress.start();
  }, []);

  const stopProgress = useCallback(() => {
    if (!BProgress.isStarted()) return;
    BProgress.done();
  }, []);

  const progress = useCallback(
    (
      href: string,
      method: 'push' | 'replace',
      optionsNav?: NavigateOptions,
      progressOptions?: RouterActionsProgressOptions,
    ) => {
      const mergedOptions = { ...defaultProgressOptions, ...progressOptions };

      if (mergedOptions.showProgress === false) {
        return router[method](href, optionsNav);
      }

      const currentUrl = new URL(location.href);
      const targetUrl = new URL(href, location.href);

      if (mergedOptions.basePath) {
        targetUrl.pathname =
          mergedOptions.basePath +
          (targetUrl.pathname !== '/' ? targetUrl.pathname : '');
      }

      const sameURL = isSameURL(targetUrl, currentUrl);

      if (sameURL && mergedOptions.disableSameURL !== false) {
        return router[method](href, optionsNav);
      }

      startProgress(mergedOptions.startPosition);
      if (sameURL) stopProgress();
      return router[method](href, optionsNav);
    },
    [router, defaultProgressOptions, startProgress, stopProgress],
  );

  const push = useCallback(
    (
      href: string,
      optionsNav?: NavigateOptions,
      progressOptions?: RouterActionsProgressOptions,
    ) => {
      progress(href, 'push', optionsNav, progressOptions);
    },
    [progress],
  );

  const replace = useCallback(
    (
      href: string,
      optionsNav?: NavigateOptions,
      progressOptions?: RouterActionsProgressOptions,
    ) => {
      progress(href, 'replace', optionsNav, progressOptions);
    },
    [progress],
  );

  const back = useCallback(
    (progressOptions?: RouterActionsProgressOptions) => {
      const mergedOptions = { ...defaultProgressOptions, ...progressOptions };
      if (mergedOptions.showProgress === false) return router.back();
      startProgress(mergedOptions.startPosition);
      return router.back();
    },
    [router, defaultProgressOptions, startProgress],
  );

  const refresh = useCallback(
    (progressOptions?: RouterActionsProgressOptions) => {
      const mergedOptions = { ...defaultProgressOptions, ...progressOptions };
      if (mergedOptions.showProgress === false) return router.refresh();
      startProgress(mergedOptions.startPosition);
      stopProgress();
      return router.refresh();
    },
    [router, defaultProgressOptions, startProgress, stopProgress],
  );

  const enhancedRouter = useMemo(() => {
    return { ...router, push, replace, back, refresh };
  }, [router, push, replace, back, refresh]);

  return enhancedRouter;
}

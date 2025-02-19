import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BProgress } from '@bprogress/core';
import { isSameURL, isSameURLWithoutSearch } from '../utils/sameURL';
import {
  usePathname,
  useSearchParams,
  useRouter as useNextRouter,
} from 'next/navigation';
import type {
  AppProgressProps,
  RouterActionsProgressOptions,
  RouterProgressOptions,
} from '../types';
import { getAnchorProperty } from '../utils/getAnchorProperty';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export const AppProgress = React.memo(
  ({
    shallowRouting = false,
    disableSameURL = true,
    startPosition = 0,
    delay = 0,
    stopDelay = 0,
    targetPreprocessor,
    disableAnchorClick = false,
    startOnLoad = false,
  }: AppProgressProps) => {
    let progressDoneTimer: NodeJS.Timeout;

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
      if (startOnLoad) BProgress.start();
      if (progressDoneTimer) clearTimeout(progressDoneTimer);
      progressDoneTimer = setTimeout(() => {
        BProgress.done();
      }, stopDelay);
    }, [pathname, searchParams]);

    const elementsWithAttachedHandlers = useRef<
      (HTMLAnchorElement | SVGAElement)[]
    >([]);
    useEffect(() => {
      if (disableAnchorClick) {
        return;
      }

      let timer: NodeJS.Timeout;

      const startProgress = () => {
        timer = setTimeout(() => {
          if (startPosition > 0) BProgress.set(startPosition);
          BProgress.start();
        }, delay);
      };

      const stopProgress = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          if (!BProgress.isStarted()) return;
          BProgress.done();
        }, stopDelay);
      };

      const handleAnchorClick = (event: MouseEvent) => {
        // Skip preventDefault
        if (event.defaultPrevented) return;

        const anchorElement = event.currentTarget as
          | HTMLAnchorElement
          | SVGAElement;
        const target = event.target as HTMLElement | Element;
        let preventProgress =
          target?.getAttribute('data-prevent-progress') === 'true' ||
          anchorElement?.getAttribute('data-prevent-progress') === 'true';

        if (!preventProgress) {
          let element: HTMLElement | Element | null = target;

          while (element && element.tagName.toLowerCase() !== 'a') {
            if (
              element.parentElement?.getAttribute('data-prevent-progress') ===
              'true'
            ) {
              preventProgress = true;
              break;
            }
            element = element.parentElement;
          }
        }

        if (preventProgress) return;

        const anchorTarget = getAnchorProperty(anchorElement, 'target');
        // Skip anchors with target="_blank"
        if (anchorTarget === '_blank') return;

        // Skip control/command/option/alt+click
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;

        const targetHref = getAnchorProperty(anchorElement, 'href');
        const targetUrl = targetPreprocessor
          ? targetPreprocessor(new URL(targetHref))
          : new URL(targetHref);
        const currentUrl = new URL(location.href);

        if (
          shallowRouting &&
          isSameURLWithoutSearch(targetUrl, currentUrl) &&
          disableSameURL
        )
          return;
        if (isSameURL(targetUrl, currentUrl) && disableSameURL) return;

        startProgress();
      };

      const handleMutation: MutationCallback = () => {
        const anchorElements = Array.from(document.querySelectorAll('a')) as (
          | HTMLAnchorElement
          | SVGAElement
        )[];

        const validAnchorElements = anchorElements.filter((anchor) => {
          const href = getAnchorProperty(anchor, 'href');
          const isBProgressDisabled =
            anchor.getAttribute('data-disable-progress') === 'true';
          const isNotTelOrMailto =
            href &&
            !href.startsWith('tel:') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('blob:') &&
            !href.startsWith('javascript:');

          return (
            !isBProgressDisabled &&
            isNotTelOrMailto &&
            getAnchorProperty(anchor, 'target') !== '_blank'
          );
        });

        validAnchorElements.forEach((anchor) => {
          anchor.addEventListener('click', handleAnchorClick, true);
        });
        elementsWithAttachedHandlers.current = validAnchorElements;
      };

      const mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(document, { childList: true, subtree: true });

      const originalWindowHistoryPushState = window.history.pushState;
      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray: PushStateInput) => {
          stopProgress();
          return target.apply(thisArg, argArray);
        },
      });

      return () => {
        mutationObserver.disconnect();
        elementsWithAttachedHandlers.current.forEach((anchor) => {
          anchor.removeEventListener('click', handleAnchorClick, true);
        });
        elementsWithAttachedHandlers.current = [];
        window.history.pushState = originalWindowHistoryPushState;
      };
    }, [
      disableAnchorClick,
      targetPreprocessor,
      shallowRouting,
      disableSameURL,
    ]);

    return null;
  },
  (prevProps, nextProps) => {
    if (nextProps?.memo === false) {
      return false;
    }

    if (!nextProps?.shouldCompareComplexProps) {
      return true;
    }

    return (
      prevProps?.color === nextProps?.color &&
      prevProps?.height === nextProps?.height &&
      prevProps?.shallowRouting === nextProps?.shallowRouting &&
      prevProps?.startPosition === nextProps?.startPosition &&
      prevProps?.delay === nextProps?.delay &&
      prevProps?.disableSameURL === nextProps?.disableSameURL &&
      prevProps?.stopDelay === nextProps?.stopDelay &&
      prevProps?.nonce === nextProps?.nonce &&
      JSON.stringify(prevProps?.options) ===
        JSON.stringify(nextProps?.options) &&
      prevProps?.style === nextProps?.style &&
      prevProps.disableAnchorClick === nextProps.disableAnchorClick
    );
  },
);

AppProgress.displayName = 'AppProgress';

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

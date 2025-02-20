import React, { useEffect, useRef } from 'react';
import { BProgress } from '@bprogress/core';
import { useLocation } from '@remix-run/react';
import { isSameURL, isSameURLWithoutSearch } from '@bprogress/react';
import type { RemixProgressProps } from '../types';
import { getAnchorProperty } from '../utils/getAnchorProperty';

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export const RemixProgress = React.memo(
  ({
    shallowRouting = false,
    disableSameURL = true,
    startPosition = 0,
    delay = 0,
    stopDelay = 0,
    targetPreprocessor,
    disableAnchorClick = false,
    startOnLoad = false,
  }: RemixProgressProps) => {
    let progressDoneTimer: NodeJS.Timeout;

    const routerLocation = useLocation();

    useEffect(() => {
      if (startOnLoad) BProgress.start();
      if (progressDoneTimer) clearTimeout(progressDoneTimer);
      progressDoneTimer = setTimeout(() => {
        BProgress.done();
      }, stopDelay);
    }, [routerLocation]);

    const elementsWithAttachedHandlers = useRef<
      (HTMLAnchorElement | SVGAElement)[]
    >([]);

    useEffect(() => {
      if (disableAnchorClick) return;

      let timer: NodeJS.Timeout;

      const startProgress = () => {
        console.log('startProgress');
        console.log('delay', delay);
        timer = setTimeout(() => {
          if (startPosition > 0) BProgress.set(startPosition);
          console.log('BProgress.start');
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
        console.log('handleAnchorClick');

        // Skip preventDefault
        if (event.defaultPrevented) return;

        const anchorElement = event.currentTarget as
          | HTMLAnchorElement
          | SVGAElement;
        const target = event.target as HTMLElement | Element;
        let preventProgress =
          target?.getAttribute('data-prevent-progress') === 'true' ||
          anchorElement?.getAttribute('data-prevent-progress') === 'true';

        console.log('preventProgress', preventProgress);

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

        console.log('anchorTarget', anchorTarget);
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

        console.log('targetHref', targetHref);
        console.log('targetUrl', targetUrl);
        console.log('currentUrl', currentUrl);

        if (
          shallowRouting &&
          isSameURLWithoutSearch(targetUrl, currentUrl) &&
          disableSameURL
        )
          return;

        console.log('pass shallowRouting');

        if (isSameURL(targetUrl, currentUrl) && disableSameURL) return;

        console.log('pass isSameURL');

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
    if (nextProps.memo === false) return false;
    if (!nextProps.shouldCompareComplexProps) return true;
    return (
      prevProps.shallowRouting === nextProps.shallowRouting &&
      prevProps.startPosition === nextProps.startPosition &&
      prevProps.delay === nextProps.delay &&
      prevProps.disableSameURL === nextProps.disableSameURL &&
      prevProps.stopDelay === nextProps.stopDelay
    );
  },
);

RemixProgress.displayName = 'RemixProgress';

import { useEffect, useRef } from 'react';
import { isSameURL, isSameURLWithoutSearch } from '../utils/same-url';
import { getAnchorProperty } from '../utils/get-anchor-property';
import type { UseAnchorProgressOptions } from '../types';
import { useProgress } from '../providers/progress-provider';

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export function useAnchorProgress(
  {
    shallowRouting = false,
    disableSameURL = true,
    startPosition = 0,
    delay = 0,
    stopDelay = 0,
    targetPreprocessor,
    disableAnchorClick = false,
    startOnLoad = false,
    forcedStopDelay = 0,
  }: UseAnchorProgressOptions,
  deps: any[] = [],
) {
  const elementsWithAttachedHandlers = useRef<
    (HTMLAnchorElement | SVGAElement)[]
  >([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { start, stop } = useProgress();

  useEffect(() => {
    if (startOnLoad) start(startPosition, delay);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => stop(), stopDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, deps);

  useEffect(() => {
    if (disableAnchorClick) return;

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

      start(startPosition, delay);
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
        stop(stopDelay, forcedStopDelay);
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
    delay,
    stopDelay,
    startPosition,
  ]);
}

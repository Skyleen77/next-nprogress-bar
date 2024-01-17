import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { getAnchorProperty } from './utils/getAnchorProperty';
import { isSameURL } from './utils/sameURL';
import {
  usePathname,
  useSearchParams,
  useRouter as useNextRouter,
} from 'next/navigation';
import { ProgressBarProps } from '.';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export const AppProgressBar = React.memo(
  ({
    color = '#0A2FFF',
    height = '2px',
    options,
    shallowRouting = false,
    delay = 0,
    style,
  }: ProgressBarProps) => {
    const styles = (
      <style>
        {style ||
          `
          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: ${color};

            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;

            width: 100%;
            height: ${height};
          }

          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
            opacity: 1.0;

            -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
          }

          /* Remove these to get rid of the spinner */
          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }

          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;

            border: solid 2px transparent;
            border-top-color: ${color};
            border-left-color: ${color};
            border-radius: 50%;

            -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
          }

          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }

          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }

          @-webkit-keyframes nprogress-spinner {
            0%   { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          @keyframes nprogress-spinner {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    );

    NProgress.configure(options || {});

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
      NProgress.done();
    }, [pathname, searchParams]);

    useEffect(() => {
      let timer: NodeJS.Timeout;

      const startProgress = () => {
        timer = setTimeout(NProgress.start, delay);
      };

      const stopProgress = () => {
        clearTimeout(timer);
        NProgress.done();
      };

      const handleAnchorClick = (event: MouseEvent) => {
        const anchorElement = event.currentTarget as HTMLAnchorElement | SVGAElement;

        // Skip anchors with target="_blank"
        if (getAnchorProperty(anchorElement, 'target') === '_blank') return;

        // Skip control/command+click
        if (event.metaKey || event.ctrlKey) return;

        const targetUrl = new URL(getAnchorProperty(anchorElement, 'href'));
        const currentUrl = new URL(location.href);

        if (shallowRouting && isSameURL(targetUrl, currentUrl)) return;
        if (targetUrl?.href === currentUrl?.href) return;

        startProgress();
      };

      const handleMutation: MutationCallback = () => {
        const anchorElements = Array.from(
          document.querySelectorAll('a')
        ) as (HTMLAnchorElement | SVGAElement)[];
        // Skip anchors with target="_blank" and anchors without href
        const validAnchorELes = anchorElements.filter(
          (anchor) =>
            getAnchorProperty(anchor, 'href') &&
            getAnchorProperty(anchor, 'target') !== '_blank',
        );
        validAnchorELes.forEach((anchor) =>
          anchor.addEventListener('click', handleAnchorClick),
        );
      };

      const mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(document, { childList: true, subtree: true });

      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray: PushStateInput) => {
          stopProgress();
          return target.apply(thisArg, argArray);
        },
      });
    }, []);

    return styles;
  },
  () => true,
);

export function useRouter() {
  const router = useNextRouter();
  const pathname = usePathname();

  function push(
    href: string,
    options?: NavigateOptions,
    NProgressOptions?: { showProgressBar?: boolean },
  ) {
    if (NProgressOptions?.showProgressBar === false)
      return router.push(href, options);

    const currentUrl = new URL(pathname, location.href);
    const targetUrl = new URL(href, location.href);

    if (isSameURL(targetUrl, currentUrl) || href === pathname)
      return router.push(href, options);

    NProgress.start();

    return router.push(href, options);
  }

  function back(NProgressOptions?: { showProgressBar?: boolean }) {
    if (NProgressOptions?.showProgressBar === false) return router.back();

    NProgress.start();

    return router.back();
  }

  return { ...router, push, back };
}

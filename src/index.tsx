import React, { useEffect } from 'react';
import NProgress, { NProgressOptions } from 'nprogress';

interface ProgressBarProps {
  color?: string;
  height?: string;
  options?: Partial<NProgressOptions>;
  appDirectory?: boolean;
  shallowRouting?: boolean;
  delay?: number;
  style?: string;
}

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

/**
 * @param color Color of the progress bar. @default #0A2FFF
 * @param height Height of the progress bar. @default 2px
 * @param options NProgress options. @default undefined
 * @param appDirectory If your are in the app directory - @default false
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - @default false
 * @param delay When the page loads faster than the progress bar, it does not display - @default 0
 * @param style Custom css - @default undefined
 */

const ProgressBar = React.memo(
  ({
    color = '#0A2FFF',
    height = '2px',
    options,
    appDirectory = false,
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

    useEffect(() => {
      options && NProgress.configure(options);

      let timer: NodeJS.Timeout;

      const startProgress = () => {
        timer = setTimeout(NProgress.start, delay);
      };

      const stopProgress = () => {
        clearTimeout(timer);
        NProgress.done();
      };

      if (appDirectory) {
        NProgress.configure({ showSpinner: false });

        const handleAnchorClick = (event: MouseEvent) => {
          const targetUrl = new URL(
            (event.currentTarget as HTMLAnchorElement).href,
          );
          const currentUrl = new URL(location.href);

          if (!shallowRouting || !isSameURL(targetUrl, currentUrl)) {
            startProgress();
          }
        };

        const handleMutation: MutationCallback = () => {
          const anchorElements = document.querySelectorAll('a');
          anchorElements.forEach((anchor) =>
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
      } else {
        import('next/router')
          .then(({ default: Router }) => {
            const handleRouteStart = (url: string) => {
              const targetUrl = new URL(url, location.href);
              const currentUrl = new URL(Router.route, location.href);

              if (!shallowRouting || !isSameURL(targetUrl, currentUrl)) {
                startProgress();
              }
            };
            const handleRouteDone = () => stopProgress();

            Router.events.on('routeChangeStart', handleRouteStart);
            Router.events.on('routeChangeComplete', handleRouteDone);
            Router.events.on('routeChangeError', handleRouteDone);

            return () => {
              // Make sure to remove the event handler on unmount!
              Router.events.off('routeChangeStart', handleRouteStart);
              Router.events.off('routeChangeComplete', handleRouteDone);
              Router.events.off('routeChangeError', handleRouteDone);
            };
          })
          .catch((err) => console.error('Failed to load module', err));
      }
    }, []);

    return styles;
  },
  () => true,
);

export default ProgressBar;

function isSameURL(target: URL, current: URL) {
  const cleanTarget = target.protocol + '//' + target.host + target.pathname;
  const cleanCurrent =
    current.protocol + '//' + current.host + current.pathname;

  return cleanTarget === cleanCurrent;
}

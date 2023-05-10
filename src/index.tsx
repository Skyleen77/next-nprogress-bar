import React, { useEffect } from 'react';
import NProgress, { NProgressOptions } from 'nprogress';
// import Router from 'next/router';

interface ProgressBarProps {
  color?: string;
  height?: string;
  options?: Partial<NProgressOptions>;
  appDirectory?: boolean;
  shallowRouting?: boolean;
}

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

/**
 * @param color Color of the progress bar.
 * @param height Height of the progress bar.
 * @param options NProgress options.
 * @param appDirectory If your are in the app directory - false by default
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - false by default
 */

const ProgressBar = React.memo(
  ({
    color = '#0A2FFF',
    height = '2px',
    options,
    appDirectory = false,
    shallowRouting = false,
  }: ProgressBarProps) => {
    const styles = (
      <style>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height};
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}</style>
    );

    useEffect(() => {
      options && NProgress.configure(options);

      if (appDirectory) {
        NProgress.configure({ showSpinner: false });

        const handleAnchorClick = (event: MouseEvent) => {
          const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
          const currentUrl = location.href;
          if (!shallowRouting || targetUrl !== currentUrl) {
            NProgress.start();
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
            NProgress.done();
            return target.apply(thisArg, argArray);
          },
        });
      } else {
        import('next/router')
          .then(({ default: Router }) => {
            const handleRouteStart = (url: string) => {
              if (!shallowRouting || url !== Router.route) {
                NProgress.start();
              }
            };
            const handleRouteDone = () => NProgress.done();

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

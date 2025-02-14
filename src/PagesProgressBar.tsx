import React, { useEffect } from 'react';
import { NProgress } from 'nprogress-v2';
import { isSameURL, isSameURLWithoutSearch } from './utils/sameURL';
import Router from 'next/router';
import type { PagesProgressBarProps } from '.';
import { css } from './utils/css';

export const PagesProgressBar = React.memo(
  ({
    color = '#0A2FFF',
    height = '2px',
    options,
    spinnerPosition = 'top-right',
    shallowRouting = false,
    disableSameURL = true,
    startPosition = 0,
    delay = 0,
    stopDelay = 0,
    style,
    disableStyle = false,
    nonce,
  }: PagesProgressBarProps) => {
    const styles = (
      <style nonce={nonce}>
        {style ||
          css({
            color,
            height,
            spinnerPosition,
          })}
      </style>
    );

    NProgress.configure(options || {});

    useEffect(() => {
      let timer: NodeJS.Timeout;

      const startProgress = () => {
        timer = setTimeout(() => {
          if (startPosition > 0) NProgress.set(startPosition);
          NProgress.start();
        }, delay);
      };

      const stopProgress = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          if (!NProgress.isStarted()) return;
          NProgress.done(true);
        }, stopDelay);
      };

      const handleRouteStart = (url: string) => {
        const targetUrl = new URL(url, location.href);
        const currentUrl = new URL(location.href);

        if (
          shallowRouting &&
          isSameURLWithoutSearch(targetUrl, currentUrl) &&
          disableSameURL
        )
          return;

        // If the URL is the same, we don't want to start the progress bar
        if (isSameURL(targetUrl, currentUrl) && disableSameURL) return;

        startProgress();
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
    }, []);

    return !disableStyle ? styles : null;
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
      prevProps?.style === nextProps?.style
    );
  },
);

PagesProgressBar.displayName = 'PagesProgressBar';

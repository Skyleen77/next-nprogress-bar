import React, { useEffect } from 'react';
import { BProgress } from '@bprogress/core';
import { isSameURL, isSameURLWithoutSearch } from '@bprogress/react';
import Router from 'next/router';
import type { PagesProgressProps } from '../types';

export const PagesProgress = React.memo(
  ({
    shallowRouting = false,
    disableSameURL = true,
    startPosition = 0,
    delay = 0,
    stopDelay = 0,
  }: PagesProgressProps) => {
    useEffect(() => {
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
          BProgress.done(true);
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
      prevProps?.shallowRouting === nextProps?.shallowRouting &&
      prevProps?.startPosition === nextProps?.startPosition &&
      prevProps?.delay === nextProps?.delay &&
      prevProps?.disableSameURL === nextProps?.disableSameURL &&
      prevProps?.stopDelay === nextProps?.stopDelay
    );
  },
);

PagesProgress.displayName = 'PagesProgress';

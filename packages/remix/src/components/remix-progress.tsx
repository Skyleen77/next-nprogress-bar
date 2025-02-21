import { useLocation } from '@remix-run/react';
import { useAnchorProgress, withMemo } from '@bprogress/react';
import type { RemixProgressProps } from '../types';

const RemixProgressComponent = ({
  shallowRouting = false,
  disableSameURL = true,
  startPosition = 0,
  delay = 0,
  stopDelay = 0,
  targetPreprocessor,
  disableAnchorClick = false,
  startOnLoad = false,
}: RemixProgressProps) => {
  const routerLocation = useLocation();

  useAnchorProgress(
    {
      shallowRouting,
      disableSameURL,
      startPosition,
      delay,
      stopDelay,
      targetPreprocessor,
      disableAnchorClick,
      startOnLoad,
      forcedStopDelay: 500,
    },
    [routerLocation],
  );

  return null;
};

export const RemixProgress = withMemo(RemixProgressComponent);

RemixProgress.displayName = 'RemixProgress';

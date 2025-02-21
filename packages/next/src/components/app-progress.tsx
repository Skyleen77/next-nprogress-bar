import {
  useAnchorProgress,
  withMemo,
  type AnchorProgressProps,
} from '@bprogress/react';
import { usePathname, useSearchParams } from 'next/navigation';

const AppProgressComponent = ({
  shallowRouting = false,
  disableSameURL = true,
  startPosition = 0,
  delay = 0,
  stopDelay = 0,
  targetPreprocessor,
  disableAnchorClick = false,
  startOnLoad = false,
}: AnchorProgressProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    },
    [pathname, searchParams],
  );

  return null;
};

export const AppProgress = withMemo(AppProgressComponent);

AppProgress.displayName = 'AppProgress';

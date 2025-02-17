import React from 'react';
import { BaseProgressProvider } from './base-progress-provider';
import type { AppProgressProps, AppProgressProviderProps } from '../types';
import { AppProgress } from '../components/app-progress';
import withSuspense from '../utils/with-suspense';

const SuspendedAppProgress = withSuspense<AppProgressProps>(AppProgress);

export const AppProgressProvider = ({
  children,
  ...props
}: AppProgressProviderProps) => {
  return (
    <BaseProgressProvider>
      <SuspendedAppProgress {...props} />
      {children}
    </BaseProgressProvider>
  );
};

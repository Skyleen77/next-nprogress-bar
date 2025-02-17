import React from 'react';
import { BaseProgressProvider } from './base-progress-provider';
import type { PagesProgressProviderProps } from '../types';
import { PagesProgress } from '../components/pages-progress';

export const PagesProgressProvider = ({
  children,
  ...props
}: PagesProgressProviderProps) => {
  return (
    <BaseProgressProvider>
      <PagesProgress {...props} />
      {children}
    </BaseProgressProvider>
  );
};

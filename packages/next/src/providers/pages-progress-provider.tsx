import React from 'react';
import type { PagesProgressProviderProps } from '../types';
import { PagesProgress } from '../components/pages-progress';
import { NextProgressProvider } from './next-progress-provider';

export const PagesProgressProvider = ({
  children,
  ...props
}: PagesProgressProviderProps) => {
  return (
    <NextProgressProvider ProgressComponent={PagesProgress} {...props}>
      {children}
    </NextProgressProvider>
  );
};

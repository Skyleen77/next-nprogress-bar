import React, { useEffect, useState } from 'react';
import { ProgressProvider } from '@bprogress/react';
import { RemixProgress } from '../components/remix-progress';
import type { RemixProgressProviderProps } from '../types';

export const RemixProgressProvider = ({
  children,
  color,
  height,
  options,
  spinnerPosition,
  style,
  disableStyle,
  nonce,
  ...props
}: RemixProgressProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <>{children}</>;

  return (
    <ProgressProvider
      color={color}
      height={height}
      options={options}
      spinnerPosition={spinnerPosition}
      style={style}
      disableStyle={disableStyle}
      nonce={nonce}
    >
      <RemixProgress {...props} />
      {children}
    </ProgressProvider>
  );
};

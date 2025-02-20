import React, { useEffect, useState } from 'react';
import { ProgressProvider } from '@bprogress/react';
import type { RemixProgressProviderProps } from '../types';
import { RemixProgress } from '../components/remix-progress';

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

  console.log('remix load server side');

  if (!isMounted) return <>{children}</>;

  console.log('remix load client side');

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

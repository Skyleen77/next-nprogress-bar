import React from 'react';
import { ProgressProvider } from '@bprogress/react';
import type { NextProgressProps } from '../types';

export interface NextProgressProviderComponentProps extends NextProgressProps {
  ProgressComponent: React.ComponentType<NextProgressProps>;
}

export const NextProgressProvider = ({
  children,
  ProgressComponent,
  color,
  height,
  options,
  spinnerPosition,
  style,
  disableStyle,
  nonce,
  ...props
}: NextProgressProviderComponentProps) => {
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
      <ProgressComponent {...props} />
      {children}
    </ProgressProvider>
  );
};

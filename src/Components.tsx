import React from 'react';
import { classNames } from './utils/classNames';
import { ProgressComponentProps } from '.';

export const Progress = ({
  as: Comp = 'div',
  children,
  className,
  style,
}: ProgressComponentProps) => {
  return (
    <Comp
      className={classNames('nprogress', className)}
      style={{ ...style, display: 'none' }}
    >
      {children || (
        <>
          <Progress.Bar>
            <Progress.Peg />
          </Progress.Bar>
          <Progress.Spinner>
            <Progress.SpinnerIcon />
          </Progress.Spinner>
        </>
      )}
    </Comp>
  );
};

const Bar = ({
  as: Comp = 'div',
  children,
  className,
}: ProgressComponentProps) => {
  return (
    <Comp className={classNames('bar', className)} role="bar">
      {children}
    </Comp>
  );
};

const Peg = ({
  as: Comp = 'div',
  children,
  className,
}: ProgressComponentProps) => {
  return <Comp className={classNames('peg', className)}>{children}</Comp>;
};

const Spinner = ({
  as: Comp = 'div',
  children,
  className,
}: ProgressComponentProps) => {
  return (
    <Comp className={classNames('spinner', className)} role="spinner">
      {children}
    </Comp>
  );
};

const SpinnerIcon = ({
  as: Comp = 'div',
  children,
  className,
}: ProgressComponentProps) => {
  return (
    <Comp className={classNames('spinner-icon', className)}>{children}</Comp>
  );
};

Progress.Bar = Bar;
Progress.Peg = Peg;
Progress.Spinner = Spinner;
Progress.SpinnerIcon = SpinnerIcon;

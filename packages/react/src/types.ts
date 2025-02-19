import type { BProgressOptions } from '@bprogress/core';

export type SpinnerPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/**
 * @param start Start the progress bar
 * @param done Stop the progress bar
 * @param inc Increase the progress Bar
 * @param set Set the progress bar to a specific value
 * @param pause Pause the progress bar
 * @param resume Resume the progress bar
 * @param setOptions Set the BProgress options
 * @param getOptions Get the BProgress options
 */
export interface ProgressContextValue {
  start: () => void;
  stop: () => void;
  inc: (amount?: number) => void;
  set: (n: number) => void;
  pause: () => void;
  resume: () => void;
  setOptions: (
    options:
      | Partial<BProgressOptions>
      | ((prevOptions: BProgressOptions) => Partial<BProgressOptions>),
  ) => void;
  getOptions: () => BProgressOptions;
}

/**
 * @param as Custom component - @default div
 * @param children Children - @default undefined
 * @param className Custom class - @default undefined
 * @param classSelector Custom class selector - @default undefined
 * @param role Custom role - @default undefined
 */
export type ProgressComponentProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children?: React.ReactNode;
  classSelector?: string;
  role?: string;
} & React.ComponentPropsWithoutRef<T>;

/**
 * @param children Children - @default undefined
 * @param color Color of the progress bar. @default #0A2FFF
 * @param height Height of the progress bar. @default 2px
 * @param options BProgress options. @default undefined
 * @param spinnerPosition Position of the spinner. @default top-right
 * @param style Custom css - @default undefined
 * @param disableStyle Disable default css - @default false
 * @param nonce Custom nonce for Content-Security-Policy directives - @default undefined
 */
export interface ProgressProviderProps {
  children?: React.ReactNode;
  color?: string;
  height?: string;
  options?: Partial<BProgressOptions>;
  spinnerPosition?: SpinnerPosition;
  style?: string;
  disableStyle?: boolean;
  nonce?: string;
}

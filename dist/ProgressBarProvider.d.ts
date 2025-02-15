import React from 'react';
import { ProgressBarContextValue } from '.';
export declare const useProgressBar: () => ProgressBarContextValue;
interface ProgressBarProviderProps {
    children?: React.ReactNode;
}
export declare const ProgressBarProvider: ({ children }: ProgressBarProviderProps) => React.JSX.Element;
export {};

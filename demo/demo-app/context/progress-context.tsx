'use client';

import { createContext, useContext, useState } from 'react';

interface ProgressContextType {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  showSpinner: boolean;
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export const useProgress = () => {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error('useProgress must be used within a ProgressContext');
  }

  return context;
};

export const ProgressProvider: React.FC<{
  children: any;
}> = ({ children }) => {
  const [color, setColor] = useState('#000000');
  const [height, setHeight] = useState('4px');
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <ProgressContext.Provider
      value={{
        color,
        setColor,
        height,
        setHeight,
        showSpinner,
        setShowSpinner,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

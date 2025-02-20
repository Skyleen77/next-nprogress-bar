import type { ProgressProviderProps } from '@bprogress/react';

/**
 * @param shallowRouting Si la progress bar ne doit pas s'afficher lors d'un "shallow" (c-à-d. changement mineur) - @default false
 * @param disableSameURL Désactive le déclenchement de la barre de progression si l'URL n'a pas vraiment changé - @default true
 * @param startPosition Position initiale de la barre - @default 0
 * @param delay Délai avant de démarrer la barre - @default 0
 * @param stopDelay Délai avant l'arrêt (fin) de la barre - @default 0
 * @param memo Active ou non le `React.memo` pour le composant - @default false
 * @param shouldCompareComplexProps Si tu veux comparer les props complexes dans la fonction de mémorisation - @default false
 */
export interface RemixProgressProps extends ProgressProviderProps {
  shallowRouting?: boolean;
  disableSameURL?: boolean;
  startPosition?: number;
  delay?: number;
  stopDelay?: number;
  memo?: boolean;
  shouldCompareComplexProps?: boolean;
  targetPreprocessor?: (url: URL) => URL;
  disableAnchorClick?: boolean;
  startOnLoad?: boolean;
}

export interface RemixProgressProviderProps extends RemixProgressProps {}

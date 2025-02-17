import type { AppProps } from 'next/app';
import { PagesProgressProvider as ProgressProvider } from '@bprogress/next';
import '../globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProgressProvider
      height="4px"
      color="#0A2FFF"
      options={{ showSpinner: false }}
      // startPosition={0.3}
      shallowRouting
    >
      <Component {...pageProps} />
    </ProgressProvider>
  );
}

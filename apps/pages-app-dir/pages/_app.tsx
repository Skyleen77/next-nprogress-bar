import type { AppProps } from 'next/app';
import { PagesProgressBar as ProgressBar } from '@bprogress/next';
import '../globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <ProgressBar
        height="4px"
        color="#0A2FFF"
        options={{ showSpinner: false }}
        // startPosition={0.3}
        shallowRouting
      />
    </>
  );
}

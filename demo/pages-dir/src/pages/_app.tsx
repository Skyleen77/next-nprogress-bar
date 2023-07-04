import type { AppProps } from 'next/app';
import { PagesProgressBar as ProgressBar } from '../../../../dist';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ProgressBar
        height="4px"
        color="#0A2FFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

'use client';

import { Home } from '@/components/home';
import { ProgressLinkProps } from '@/components/progress-link';
import { useProgress } from '@/context/progress-context';
import { useRouter } from 'next-nprogress-bar';

export default function HomePage() {
  const router = useRouter();
  const { showSpinner } = useProgress();

  const progressLinks: ProgressLinkProps[] = [
    {
      href: '/',
      children: (
        <>
          {`<Link />`} - Same page <strong>/</strong>
        </>
      ),
    },
    {
      href: '/?test=param',
      children: (
        <>
          {`<Link />`} - Add parameter <strong>?test=param</strong>
        </>
      ),
    },
    {
      href: '/page',
      children: (
        <>
          {`<Link />`} - To <strong>/page</strong>
        </>
      ),
    },
    {
      href: '/page',
      disabled: true,
      children: (
        <>
          {`<Link />`} - To <strong>/page</strong> with{' '}
          <strong>data-disable-nprogress=true</strong>
        </>
      ),
    },
    {
      href: '#features',
      children: (
        <>
          {`<Link />`} - To <strong>#features</strong> (not trigger progress
          bar)
        </>
      ),
    },
    {
      href: '/page',
      target: '_blank',
      children: (
        <>
          {`<Link />`} - To <strong>/page</strong> with{' '}
          <strong>target="_blank"</strong>
        </>
      ),
    },
    {
      href: 'tel:0000000000',
      children: (
        <>
          {`<Link />`} - To <strong>tel:0000000000</strong>
        </>
      ),
    },
    {
      href: 'mailto:john.doe@exemple.com',
      children: (
        <>
          {`<Link />`} - To <strong>mailto:john.doe@exemple.com</strong>
        </>
      ),
    },

    {
      onClick: () => {
        router.push(
          '/page',
          {},
          {
            showProgressBar: showSpinner,
          },
        );
      },
      children: (
        <>
          router.push() - To <strong>/page</strong>
        </>
      ),
    },
    {
      onClick: () => {
        router.replace(
          '/?test=param',
          {},
          {
            showProgressBar: showSpinner,
          },
        );
      },
      children: (
        <>
          router.replace() - Add parameter <strong>?test=param</strong>
        </>
      ),
    },
    {
      onClick: () => {
        router.back({
          showProgressBar: showSpinner,
        });
      },
      children: <>router.back()</>,
    },
  ];

  return <Home progressLinks={progressLinks} svgLink="/page" />;
}

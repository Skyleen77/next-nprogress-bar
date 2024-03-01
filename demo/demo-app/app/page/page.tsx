'use client';

import { Home } from '@/components/home';
import { ProgressLinkProps } from '@/components/progress-link';
import { useRouter } from 'next-nprogress-bar';

export default function Page() {
  const router = useRouter();

  const progressLinks: ProgressLinkProps[] = [
    {
      href: '/page',
      children: (
        <>
          {`<Link />`} - Same page <strong>/page</strong>
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
      href: '/',
      children: (
        <>
          {`<Link />`} - To <strong>/</strong>
        </>
      ),
    },
    {
      href: '/',
      disabled: true,
      children: (
        <>
          {`<Link />`} - To <strong>/</strong> with{' '}
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
      href: '/',
      target: '_blank',
      children: (
        <>
          {`<Link />`} - To <strong>/</strong> with{' '}
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
        router.push('/');
      },
      children: (
        <>
          router.push() - To <strong>/</strong>
        </>
      ),
    },
    {
      onClick: () => {
        router.replace('/?test=param');
      },
      children: (
        <>
          router.replace() - Add parameter <strong>?test=param</strong>
        </>
      ),
    },
    {
      onClick: () => {
        router.back();
      },
      children: <>router.back()</>,
    },
  ];

  return <Home progressLinks={progressLinks} svgLink="/" />;
}

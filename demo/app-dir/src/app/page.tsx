'use client';

import Link from 'next/link';
// import { useRouter } from 'next-nprogress-bar';
import { useRouter } from '../../../../dist';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <h1>Next NProgress Bar</h1>
      <Link href="/">Same route</Link>
      <Link href="/?test=param">Sallow</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="#test" data-disable-nprogress={true}>
        Link with nprogress disabled
      </Link>
      <button onClick={() => router.push('/dashboard')}>Push Dashboard</button>
      <button className="replace" onClick={() => router.replace('/dashboard')}>
        Replace Dashboard
      </button>
      <button onClick={() => router.push('/?test=param')}>
        Push with param
      </button>
      <button
        onClick={() =>
          router.push(
            '/dashboard',
            {},
            {
              showProgressBar: false,
            },
          )
        }
      >
        Push Dashboard without progress bar
      </button>
      <a
        className="a"
        href="https://www.npmjs.com/package/next-nprogress-bar"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link with target=`&quot;`_blank`&quot;` not affected
      </a>
      <a
        className="a"
        href="mailto:john.doe@exemple.com"
        rel="noopener noreferrer"
      >
        Link with mailto not affected
      </a>
      <a className="a" href="tel:0000000000" rel="noopener noreferrer">
        Link with tel not affected
      </a>
      <a className="a">Link without href won&apos;t throw error</a>

      <p
        style={{
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        In a svg element :
      </p>
      <svg>
        <Link href="/dashboard">
          <circle cx={30} cy={30} r={30} />
        </Link>
      </svg>
    </main>
  );
}

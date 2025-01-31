'use client';

import Link from 'next/link';
// import { useRouter } from 'next-nprogress-bar';
import { useRouter, startProgress, stopProgress } from '../../../../dist';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <h1>Next NProgress Bar</h1>
      <button className="default" onClick={() => startProgress()}>
        Start progress
      </button>
      <button className="default" onClick={() => stopProgress()}>
        Stop progress
      </button>

      <Link href="/">Same route</Link>
      <Link href="/?test=param">Sallow</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link
        href="/dashboard"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span>Dashboard</span>

        <span
          style={{
            marginTop: 15,
          }}
          onClick={(e) => e.preventDefault()}
          data-prevent-nprogress={true}
        >
          e.preventDefault()
        </span>
      </Link>
      <Link href="#test">Link with href</Link>
      <Link href="/dashboard" data-disable-nprogress={true}>
        Link with nprogress disabled
      </Link>
      <button onClick={() => router.push('/dashboard')}>Push Dashboard</button>
      <button onClick={() => router.refresh()}>Refresh</button>
      <button
        onClick={() =>
          router.push('/', undefined, {
            disableSameURL: false,
          })
        }
      >
        Push Dashboard with disableSameURL
      </button>
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
      <Link
        className="a"
        href="https://www.npmjs.com/package/next-nprogress-bar"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link with target=`&quot;`_blank`&quot;` not affected
      </Link>
      <Link
        className="a"
        href="mailto:john.doe@exemple.com"
        rel="noopener noreferrer"
      >
        Link with mailto not affected
      </Link>
      <Link className="a" href="tel:0000000000" rel="noopener noreferrer">
        Link with tel not affected
      </Link>
      <a
        className="a"
        href="blob:http://localhost:3000/123456789"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Link with blob not affected
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

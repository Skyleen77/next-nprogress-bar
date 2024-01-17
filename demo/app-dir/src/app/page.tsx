'use client';

import Link from 'next/link';
// import { useRouter } from 'next-nprogress-bar';
import { useRouter } from '../../../../dist';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Link href="/">Same route</Link>
      <Link href="/?test=param">Sallow</Link>
      <Link href="/dashboard">Dashboard</Link>
      <button onClick={() => router.push('/dashboard')}>Push Dashboard</button>
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
      <a className="a">Link without href won&apos;t throw error</a>

      <svg>
        <Link href="/dashboard">
          <circle cx={30} cy={30} r={30} />
        </Link>
      </svg>
    </main>
  );
}

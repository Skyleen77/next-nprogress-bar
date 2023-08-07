'use client';

import Link from 'next/link';
// import { useRouter } from 'next-nprogress-bar';
import { useRouter } from '../../../../../dist';

const Dashboard = () => {
  const router = useRouter();

  return (
    <main>
      <Link href="/">Home</Link>

      <button onClick={() => router.push('/dashboard')}>
        Pushing same url have no effect
      </button>

      <button className="back" onClick={() => router.back()}>
        Back
      </button>

      <button
        className="back"
        onClick={() => router.back({ showProgressBar: false })}
      >
        Back without progress bar
      </button>
    </main>
  );
};

export default Dashboard;

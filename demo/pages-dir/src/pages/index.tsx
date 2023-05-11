import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href="/?test=param">Sallow</Link>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}

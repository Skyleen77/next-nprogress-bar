import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Link href="/?test=param">Sallow</Link>
      <Link href="/dashboard">Dashboard</Link>
      <button onClick={() => router.push('/dashboard')}>Push Dashboard</button>
    </main>
  );
}

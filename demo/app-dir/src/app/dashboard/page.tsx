"use client";
import Link from "next/link";
import { useRouter } from "../../../../../dist";

const Dashboard = () => {
  const router = useRouter();
  return (
    <main>
      <Link href="/">Home</Link>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.back({ showProgressBar: true })}>
        Back with progress bar
      </button>
    </main>
  );
};

export default Dashboard;

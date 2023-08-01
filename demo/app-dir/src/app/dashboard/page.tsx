"use client";
import Link from "next/link";
import { useRouter } from "../../../../../dist";

const Dashboard = () => {
  const router = useRouter();
  return (
    <main>
      <Link href="/">Home</Link>
      <button onClick={() => router.push("/dashboard")}>
        Pushing same url have no effect
      </button>
    </main>
  );
};

export default Dashboard;

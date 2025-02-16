'use client';

import { useProgressBar } from '../../../../../dist';

const Sidebar = () => {
  const { start, stop } = useProgressBar();

  return (
    <main className="flex items-center justify-center h-screen">
      <aside className="fixed left-0 w-[300px] h-full bg-red-500 "></aside>

      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
    </main>
  );
};

export default Sidebar;

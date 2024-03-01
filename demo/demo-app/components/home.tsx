import Link from 'next/link';
import { ProgressLink, ProgressLinkProps } from './progress-link';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';
import classNames from 'classnames';
import { Input } from './input';
import { useProgress } from '@/context/progress-context';
import { Switch } from './switch';

interface HomeProps {
  progressLinks: ProgressLinkProps[];
  svgLink: string;
}

export const Home = ({ progressLinks, svgLink }: HomeProps) => {
  const [isParametersOpen, setIsParametersOpen] = useState(false);
  const { color, setColor, height, setHeight, showSpinner, setShowSpinner } =
    useProgress();

  return (
    <main className="relative flex min-h-screen flex-col items-center px-6 py-20 sm:px-14 ">
      <div className="absolute left-3 top-3 flex flex-row gap-x-2">
        <iframe
          className="sm:block hidden"
          src="https://ghbtns.com/github-btn.html?user=Skyleen77&repo=next-nprogress-bar&type=follow&count=false&size=large&v=2"
          frameBorder="0"
          scrolling="0"
          width="200"
          height="30"
          title="GitHub"
        />
        <iframe
          src="https://ghbtns.com/github-btn.html?user=Skyleen77&repo=next-nprogress-bar&type=star&star=true&count=true&size=large&v=2"
          frameBorder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"
        />
      </div>

      <Link
        href="https://www.npmjs.com/package/next-nprogress-bar"
        rel="noopener noreferrer"
        target="_blank"
        className="absolute right-3 top-3 rounded-full bg-[#CC3533] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        NPM package
      </Link>

      <div className="flex flex-col items-center text-center">
        <span className="nprogress-logo fade"></span>
        <div className="text-4xl font-medium mt-8">Next NProgress Bar</div>
        <p className="mt-6 max-w-xl text-gray-600">
          Next NProgress Bar is the best Progress Bar for Next.js.
          <br />
          You can use it for the <strong>app</strong> and <strong>pages</strong>{' '}
          directory.
        </p>
      </div>

      <div className="mt-8 w-full max-w-xl bg-gray-100 rounded-xl flex flex-col items-center justify-center">
        <button
          className="flex flex-row gap-x-1.5 text-2xl items-center h-12"
          onClick={() => setIsParametersOpen((prev) => !prev)}
        >
          Parameters{' '}
          <ChevronUp
            className={classNames(
              'w-7 h-7 transition-transform duration-100 ease-in',
              isParametersOpen && 'rotate-180',
            )}
          />
        </button>

        {isParametersOpen && (
          <div className="w-[300px] pt-2 pb-6 flex flex-col gap-y-2.5">
            <Input
              label="Color"
              type="color"
              name="color"
              value={color}
              setValue={setColor}
              className="h-10 !py-0"
            />

            <Input
              label="Height (px)"
              type="number"
              name="height"
              value={height.replace('px', '')}
              setValue={(value) => setHeight(`${value}px`)}
            />

            <Switch
              label="Show spinner"
              value={showSpinner}
              setValue={setShowSpinner}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-x-10 gap-y-4 mt-10 max-w-5xl w-full">
        {progressLinks.map((progressLink, i) => (
          <ProgressLink key={i} {...progressLink} />
        ))}
      </div>

      <div className="mt-8">
        <svg viewBox="0 0 200 100" width={200} height={100}>
          <Link href={svgLink}>
            <rect
              width={200}
              height={100}
              stroke="#000"
              strokeWidth={3}
              fill="none"
            />
            <circle cx={50} cy={50} r={30} />
            <text x={130} y={50} textAnchor="middle" dy=".3em">
              Link in svg
            </text>
          </Link>
        </svg>
      </div>
    </main>
  );
};

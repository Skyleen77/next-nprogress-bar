import { useTheme } from 'next-themes';
import { Logo } from '@/components/logo';
import ThemeSwitcher from '@workspace/ui/components/ui/theme-switcher';

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed lg:top-14 top-10 left-0 z-40 w-full">
      <div className="flex items-center justify-between max-w-[1400px] w-full mx-auto px-6">
        <Logo className="lg:h-6 h-4" />

        <ThemeSwitcher
          checked={theme === 'dark'}
          onCheckedChange={(checked) => {
            setTheme(checked ? 'dark' : 'light');
          }}
        />
      </div>
    </div>
  );
};

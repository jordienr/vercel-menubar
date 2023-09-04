import { Moon, Sun, Laptop } from 'lucide-react';
import { Button } from 'src/components/ui/button';
import { useTheme } from 'src/components/layout/ThemeProvider';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex gap-1">
      <Button variant="ghost" size="icon" onClick={() => setTheme('light')}>
        <Sun size="16" />
        <span className="sr-only">light theme</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setTheme('dark')}>
        <Moon size="16" />
        <span className="sr-only">dark theme</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setTheme('system')}>
        <Laptop size="16" />
        <span className="sr-only">system theme</span>
      </Button>
    </div>
  );
}

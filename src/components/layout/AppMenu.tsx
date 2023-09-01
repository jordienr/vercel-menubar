import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function AppMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="border p-2 rounded-lg hover:bg-slate-200/50"
        >
          <SettingsIcon size="16" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuItem>
          <Link to="/deployments">Deployments</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/config">Config</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/about">About</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

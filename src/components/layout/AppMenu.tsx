import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/button';

export function AppMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" type="button">
          <SettingsIcon size="16" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuItem>
          <Link to="/deployments">Deployments</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/about">About</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

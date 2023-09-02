import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import {
  FoldersIcon,
  LucideIcon,
  ServerIcon,
  SettingsIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/button';

type LinkItemProps = {
  Icon: LucideIcon;
  to: string;
  label: string;
};
function LinkItem({ Icon, to, label }: LinkItemProps) {
  return (
    <DropdownMenuItem className="flex p-0">
      <Link className="flex gap-2 items-center w-full p-2" to={to}>
        <Icon size="16" className="text-slate-500 dark:text-slate-300" />
        {label}
      </Link>
    </DropdownMenuItem>
  );
}

export function AppMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" type="button">
          <SettingsIcon size="16" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <LinkItem to="/projects" Icon={FoldersIcon} label="Projects" />
        <LinkItem to="/deployments" Icon={ServerIcon} label="Deployments" />
        <LinkItem to="/settings" Icon={SettingsIcon} label="Settings" />
        <DropdownMenuSeparator />
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

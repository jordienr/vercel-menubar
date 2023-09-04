import { Link, useLocation } from 'react-router-dom';
import { useTeams, useUser } from '@/lib/queries';
import { LucideIcon, SettingsIcon, UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { VercelAvatar } from '../VercelAvatar';
import { ThemeToggle } from './ThemeToggle';

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

export function AccountPicker() {
  const { data: userData, isLoading: userLoading } = useUser();
  const { data: teamsData, isLoading: teamsLoading } = useTeams();

  const { search } = useLocation();
  const teamId = new URLSearchParams(search).get('teamId');

  const activeTeam = teamsData?.teams.find((team: any) => team.id === teamId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <div className="p-1 h-8 w-8 rounded-lg flex gap-2 items-center">
          {teamId ? (
            <VercelAvatar size="24" id={activeTeam?.avatar} />
          ) : (
            <VercelAvatar size="24" id={userData?.user.avatar} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 mt-2">
        <DropdownMenuItem>
          {userLoading ? (
            'Loading...'
          ) : (
            <Link to="/deployments" className="flex items-center gap-2">
              <VercelAvatar size="28" id={userData?.user.avatar} />
              <span className="font-medium">{userData?.user.name}</span>
            </Link>
          )}
        </DropdownMenuItem>

        {teamsLoading
          ? 'Loading...'
          : teamsData?.teams.map((team: any) => (
              <DropdownMenuItem key={team.id}>
                <Link
                  to={`/deployments?teamId=${team.id}`}
                  className="flex items-center gap-3"
                >
                  <VercelAvatar size="28" id={team.avatar} />
                  <span className="font-medium">{team.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
        <DropdownMenuSeparator />
        <LinkItem to="/settings" Icon={SettingsIcon} label="Settings" />
        <LinkItem to="/about" Icon={UserIcon} label="About" />
        <DropdownMenuSeparator />
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

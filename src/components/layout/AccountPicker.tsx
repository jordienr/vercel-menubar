import { useAppStore } from '@/stores/app';
import { Link, Navigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function AccountPicker() {
  const { currentAccount, accounts, setCurrentAccount } = useAppStore();

  if (!currentAccount) {
    if (accounts.length === 0) {
      Navigate({ to: '/settings' });
      return null;
    }
    setCurrentAccount(accounts[0]);
  }

  function selectAccount(acc: typeof currentAccount) {
    if (acc === currentAccount || !acc) return;
    setCurrentAccount(acc);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="flex gap-2">
          <span
            className="h-4 w-4 rounded-xl"
            style={{
              backgroundColor: currentAccount?.color.value,
            }}
          />{' '}
          {currentAccount?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {accounts.map((acc) => (
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectAccount(acc)}
              className="flex items-center justify-start gap-3 w-full p-2"
            >
              <div
                className="h-5 w-5 rounded-xl"
                style={{
                  backgroundColor: acc.color.value,
                }}
              />
              {acc.name}
            </Button>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="p-0">
          <Link className="flex gap-2 p-2" to="/settings">
            <PlusIcon className="h-5 w-5" />
            Add account
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

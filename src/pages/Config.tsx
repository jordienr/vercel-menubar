import { createId } from '@/lib/utils';
import { useAppStore } from '@/stores/app';
import { MainLayout } from '@/components/layout/MainLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export function Config() {
  const { accounts, addAccount, removeAccount } = useAppStore();

  function onSubmit(e: any) {
    e.preventDefault();
    const name = e.target.name.value;
    const token = e.target.token.value;
    const id = createId();

    addAccount({
      id,
      name,
      token,
    });

    e.target.reset();
  }

  function formatToken(token: string) {
    return `${token.slice(4, 8)}...${token.slice(-4)}`;
  }

  function deleteAccount(id: string) {
    removeAccount(id);
  }
  return (
    <MainLayout title="Config">
      <div className="p-4">
        <h2 className="text-xl font-medium mt-4">Accounts</h2>
        {accounts?.length === 0 && <p>No accounts</p>}
        {accounts && accounts.length > 0 && (
          <ul className="mt-4 flex flex-col gap-4">
            {accounts.map((account) => (
              <li
                className="flex gap-4 items-center justify-between rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                key={account.id}
              >
                <div>
                  <p>{account.name}</p>
                  <p className="font-mono">{formatToken(account.token)}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={() => deleteAccount(account.id)}
                >
                  <TrashIcon size="16" />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <form className="flex flex-col mt-4 gap-3" onSubmit={onSubmit}>
          <h3 className="text-xl font-medium">Add an account</h3>
          <Label htmlFor="name">
            Name
            <Input
              className="mt-2"
              placeholder="Can be anything"
              type="text"
              name="name"
            />
          </Label>
          <Label htmlFor="token">
            Token
            <Input
              className="mt-2"
              placeholder="Vercel Access Token"
              type="password"
              name="token"
            />
            <caption className="normal-case text-left w-80">
              <a
                target="_blank"
                className="text-blue-300 underline p-3 block"
                href="https://vercel.com/account/tokens"
                rel="noreferrer"
              >
                Create a token on Vercel.com
              </a>
            </caption>
          </Label>
          <Button variant="default" type="submit">
            Add account
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}

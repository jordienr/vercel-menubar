import { createId } from '@/lib/utils';
import { useAppStore } from '@/stores/app';
import { MainLayout } from '@/components/layout/MainLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

export function Settings() {
  const colors = [
    {
      name: 'red',
      value: '#EF4444',
    },
    {
      name: 'yellow',
      value: '#F59E0B',
    },
    {
      name: 'green',
      value: '#10B981',
    },
    {
      name: 'blue',
      value: '#3B82F6',
    },
    {
      name: 'indigo',
      value: '#6366F1',
    },
    {
      name: 'purple',
      value: '#8B5CF6',
    },
    {
      name: 'pink',
      value: '#EC4899',
    },
    {
      name: 'gray',
      value: '#6B7280',
    },
  ];

  const [showAccDialog, setShowAccDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const {
    accessTokens,
    addAccessToken,
    removeAccessToken,
    currentAccessToken,
    setCurrentAccessToken,
  } = useAppStore();

  function onSubmit(e: any) {
    e.preventDefault();
    const name = e.target.name.value;
    const token = e.target.token.value;
    const id = createId();

    addAccessToken({
      id,
      name,
      token,
    });

    setShowAccDialog(false);
    e.target.reset();
  }

  function formatToken(token: string) {
    return `${token.slice(4, 8)}...${token.slice(-4)}`;
  }

  function deleteAccount(token: typeof currentAccessToken) {
    if (!token) return;
    removeAccessToken(token);
  }
  return (
    <MainLayout title="Settings">
      <div className="p-4">
        {accessTokens?.length === 0 && (
          <div className="pt-12 pb-4 text-center">
            <span className="text-2xl">🚀</span>
            <h1 className="text-2xl font-medium">
              Start by adding an access token
            </h1>
            <p className="text-slate-500 dark:text-slate-300">
              You can get your access token on{' '}
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://vercel.com/account/tokens"
                rel="noreferrer"
              >
                vercel.com/account/tokens
              </a>
            </p>
          </div>
        )}
        {accessTokens && accessTokens.length > 0 && (
          <>
            <h1 className="font-medium text-lg">Access tokens</h1>
            <p className="text-slate-500 dark:text-slate-300">
              Here you can switch between different access tokens
              <br /> in case you have more than one vercel account.
            </p>
            <ul className="mt-4 flex flex-col">
              {accessTokens.map((at) => (
                <li
                  className="flex gap-2 items-center justify-between rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                  key={at.id}
                >
                  <button
                    className="flex gap-3 items-center flex-1"
                    type="button"
                    onClick={() => setCurrentAccessToken(at)}
                  >
                    {currentAccessToken?.id === at.id && (
                      <span className="text-green-500 bg-green-100 rounded-full dark:bg-green-100/20">
                        <CheckCircle2 />
                      </span>
                    )}
                    <div className="text-left">
                      <p className="font-medium">{at.name}</p>
                      <p className="font-mono font-slate-400">
                        {formatToken(at.token)}
                      </p>
                    </div>
                  </button>
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => deleteAccount(at)}
                  >
                    <TrashIcon size="16" />
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
        <Dialog open={showAccDialog} onOpenChange={setShowAccDialog}>
          <DialogTrigger className="flex items-center justify-center w-full">
            <Button variant="default" className="mt-4">
              Add access token
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw]">
            <DialogHeader>
              <DialogHeader className="text-lg font-medium">
                Add access token
              </DialogHeader>
              <DialogDescription className="text-slate-500 dark:text-slate-400">
                The token will be stored in your computer and only be used to
                request data from Vercel API.
              </DialogDescription>
            </DialogHeader>

            <form
              className="flex flex-col mt-4 gap-3 max-w-full"
              onSubmit={onSubmit}
            >
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
                Access Token
                <Input
                  className="mt-2"
                  placeholder="Get your token on vercel.com"
                  type="password"
                  name="token"
                />
                <caption className="normal-case text-left w-80">
                  <a
                    target="_blank"
                    className="text-blue-500 dark:text-blue-300 underline p-3 block"
                    href="https://vercel.com/account/tokens"
                    rel="noreferrer"
                  >
                    vercel.com/account/tokens
                  </a>
                </caption>
              </Label>
              <DialogFooter>
                <Button variant="default" type="submit">
                  Add access token
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}

import { createId } from '@/lib/utils';
import { useAppStore } from '@/stores/app';
import { MainLayout } from '@/components/layout/MainLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCheckIcon, CheckCircle, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IconBase } from 'react-icons';

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
        <h2 className="font-medium">Accounts</h2>
        <p className="text-slate-500">
          Here you can switch between different tokens in case you have more
          than one vercel account.
        </p>
        {accessTokens?.length === 0 && <p>No access tokens found</p>}
        {accessTokens && accessTokens.length > 0 && (
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
                    <span className="text-green-500 bg-green-100 rounded-full p-1 border border-green-300">
                      <CheckCircle />
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
        )}
        <Dialog open={showAccDialog} onOpenChange={setShowAccDialog}>
          <DialogTrigger>
            <Button variant="default" className="mt-4">
              Add access token
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw]">
            <DialogHeader>
              <DialogHeader className="text-lg font-medium">
                Add access token
              </DialogHeader>
              <DialogDescription className="text-slate-500">
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

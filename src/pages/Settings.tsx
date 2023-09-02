import { createId } from '@/lib/utils';
import { useAppStore } from '@/stores/app';
import { MainLayout } from '@/components/layout/MainLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
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
  const { accounts, addAccount, removeAccount } = useAppStore();

  function onSubmit(e: any) {
    e.preventDefault();
    const name = e.target.name.value;
    const token = e.target.token.value;
    const color = selectedColor;
    const id = createId();

    addAccount({
      id,
      name,
      token,
      color,
    });

    setShowAccDialog(false);
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
        <h2 className="font-medium">Accounts</h2>
        {accounts?.length === 0 && <p>No accounts</p>}
        {accounts && accounts.length > 0 && (
          <ul className="mt-4 flex flex-col">
            {accounts.map((account) => (
              <li
                className="flex gap-4 items-center justify-between rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                key={account.id}
              >
                <div className="flex gap-4 items-center">
                  <div
                    className="h-8 w-8 p-2 flex justify-center items-center rounded-xl"
                    style={{
                      backgroundColor: account.color.value,
                    }}
                  />
                  <div>
                    <p>{account.name}</p>
                    <p className="font-mono">{formatToken(account.token)}</p>
                  </div>
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
        <Dialog open={showAccDialog} onOpenChange={setShowAccDialog}>
          <DialogTrigger>
            <Button variant="default" className="mt-4">
              Add account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw]">
            <DialogHeader>
              <DialogHeader>Add account</DialogHeader>
              <DialogDescription>
                Add your vercel accounts here. The token will be stored in your
                computer.
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
                  placeholder="Create a token on vercel.com"
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
              <Label htmlFor="color">
                Color
                <RadioGroup className="flex mt-2 gap-1 flex-wrap items-center">
                  {colors.map((color) => (
                    <Label
                      className={`flex justify-center items-center rounded-2xl gap-2 p-1 transition-all active:scale-75 ${
                        color.value === selectedColor.value ? '' : ''
                      }`}
                      htmlFor={color.value}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        outline: '2px solid',
                        outlineOffset: '-2px',
                        outlineColor:
                          color.value === selectedColor.value
                            ? color.value
                            : 'transparent',
                      }}
                    >
                      <RadioGroupItem
                        key={color.value}
                        id={color.value}
                        value={color.value}
                        className="sr-only"
                      />
                      <div
                        className="h-8 w-8 p-2 flex justify-center items-center rounded-xl"
                        style={{
                          backgroundColor: color.value,
                        }}
                      />
                      <span className="text-sm font-mono sr-only">
                        {color.name}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </Label>
              <DialogFooter>
                <Button variant="default" type="submit">
                  Add account
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}

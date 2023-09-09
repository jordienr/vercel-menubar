/* eslint-disable react/require-default-props */
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import { useDeployments } from '@/lib/queries';
import { ThemeProvider } from './ThemeProvider';
import { AccountPicker } from './AccountPicker';
import { SpinnyTriangle } from '../SpinnyTriangle';

export function MainLayout({
  children,
  title,
  loading = false,
}: PropsWithChildren<{ title: string | React.ReactNode; loading?: boolean }>) {
  return (
    <div className="app-wrapper bg-slate-100  dark:bg-black text-slate-800 dark:text-slate-100 flex flex-col h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vmb-theme">
        {loading ? (
          <div className="flex h-screen w-screen justify-center items-center animate-spin text-4xl">
            ▲
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center dark:border-slate-800 border-b">
              <h1 className="flex gap-2 items-center px-3 py-2 font-medium w-full draggable-area">
                {title}
              </h1>
              <div className="p-1 flex gap-2 items-center">
                <AccountPicker />
              </div>
            </div>
            <div className="flex-1 overflow-auto">{children}</div>
          </>
        )}
      </ThemeProvider>
    </div>
  );
}

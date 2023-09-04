/* eslint-disable react/require-default-props */
import { PropsWithChildren } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { AccountPicker } from './AccountPicker';

export function MainLayout({
  children,
  title,
  loading = false,
}: PropsWithChildren<{ title: string; loading?: boolean }>) {
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
              <h1 className="px-3 py-2 font-medium w-full draggable-area">
                {title}
              </h1>
              <div className="p-1">
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

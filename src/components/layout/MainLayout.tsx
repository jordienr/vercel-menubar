import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

import { ThemeProvider } from './ThemeProvider';
import { AppMenu } from './AppMenu';
import { AccountPicker } from './AccountPicker';

export function MainLayout({
  children,
  title,
  loading,
}: PropsWithChildren<{ title: string; loading: boolean }>) {
  return (
    <div className="bg-slate-100  dark:bg-black text-slate-800 dark:text-slate-100 flex flex-col h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vmb-theme">
        {loading ? (
          <div className="flex h-screen w-screen justify-center items-center animate-spin text-4xl">
            ▲
          </div>
        ) : (
          <>
            <div className="flex p-1 px-3 justify-between items-center gap-3 dark:border-slate-800 border-b">
              <Link
                to="/"
                className="h-10 px-1 flex items-center justify-center text-slate-700 dark:text-slate-300"
              >
                <HomeIcon size="16" />
              </Link>
              <h1 className="text-xl font-medium w-full draggable-area">
                {title}
              </h1>
              <div className="flex gap-2">
                <AccountPicker />
                <AppMenu />
              </div>
            </div>
            <div className="flex-1 overflow-auto">{children}</div>
          </>
        )}
      </ThemeProvider>
    </div>
  );
}

import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

import { ThemeProvider } from './ThemeProvider';
import { AppMenu } from './AppMenu';

export function MainLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="bg-slate-100 dark:bg-black text-slate-800 dark:text-slate-100 flex flex-col h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vmb-theme">
        <div className="flex p-1 px-3 justify-between items-center gap-3 border-b dark:border-slate-800">
          <Link
            to="/"
            className="h-10 px-1 flex items-center justify-center text-slate-700 dark:text-slate-300"
          >
            <HomeIcon size="16" />
          </Link>
          <h1 className="text-xl font-medium w-full window-draggable">
            {title}
          </h1>
          <div className="p-2">
            <AppMenu />
          </div>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </ThemeProvider>
    </div>
  );
}

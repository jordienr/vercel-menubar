import { Debug } from '@/components/Debug';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/app';
import { Link, Navigate } from 'react-router-dom';

export function Start() {
  const appStore = useAppStore();

  if (appStore.accessTokens.length === 0) return <Navigate to="/settings" />;

  return (
    <MainLayout title="Start">
      <div className="text-center py-12">
        <h1 className="text-2xl font-medium">Welcome</h1>
        {appStore.accessTokens.length === 0 ? (
          <div className="text-slate-600 text-lg mt-2 flex flex-col dark:text-slate-300">
            <span>Start by adding your Vercel Access Token</span>
            <div className="mt-4">
              <Link
                className="font-medium underline text-blue-500 dark:text-blue-400"
                to="/settings"
              >
                Go to Settings
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-left">
            <Debug data={appStore} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

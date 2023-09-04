import { useAppStore } from '@/stores/app';
import { Navigate } from 'react-router-dom';

export function Start() {
  const appStore = useAppStore();

  if (appStore.accessTokens.length === 0) return <Navigate to="/settings" />;
  return <Navigate to="/deployments" />;
}

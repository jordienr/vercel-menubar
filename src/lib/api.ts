import { Navigate } from 'react-router-dom';
import { useAppStore } from '@/stores/app';
import { Deployment } from '../../types/Deployment';

function getAuthToken() {
  const account = useAppStore.getState().currentAccount;
  if (!account || !account.token) {
    Navigate({
      to: '/settings',
    });
  }
  const { token } = account!;

  return token;
}

export function createAPIClient() {
  const BASE_URL = 'https://api.vercel.com';

  async function _fetch(path: string, options?: RequestInit) {
    const ACCESS_TOKEN = getAuthToken();

    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const json = await res.json();

    return json;
  }

  return {
    deployments: {
      list: (): Promise<{
        deployments: Deployment[];
      }> => _fetch('/v6/now/deployments'),
    },
    projects: {
      list: (): Promise<{
        projects: any;
      }> => _fetch('/v9/projects'),
    },
    teams: {
      list: (): Promise<{
        teams: any;
      }> => _fetch('/v2/teams'),
    },
  };
}

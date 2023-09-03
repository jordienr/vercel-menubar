import { Navigate } from 'react-router-dom';
import { useAppStore } from '@/stores/app';
import { Deployment } from '../../types/Deployment';

function getAuthToken() {
  const { accounts } = useAppStore.getState();
  if (!accounts) {
    Navigate({
      to: '/settings',
    });
  }
  const { token } = accounts[0]!;

  return token;
}

export function createAPIClient() {
  const BASE_URL = 'https://api.vercel.com';

  async function _fetch(
    path: string,
    options?: RequestInit & { query: Record<string, string> }
  ) {
    const ACCESS_TOKEN = getAuthToken();

    const _QUERY = new URLSearchParams(options?.query);

    const _URL = `${BASE_URL}${path}?${_QUERY}`;

    const res = await fetch(_URL, {
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
      list: ({
        teamId,
      }: {
        teamId: string;
      }): Promise<{
        deployments: Deployment[];
      }> =>
        _fetch('/v6/now/deployments', {
          query: {
            teamId,
          },
        }),
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
    user: {
      get: (): Promise<{
        user: any;
      }> => _fetch('/v2/user'),
    },
  };
}

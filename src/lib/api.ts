import { Navigate } from 'react-router-dom';
import { storage } from './storage';
import { Deployment } from '../../types/Deployment';

export function createAPIClient() {
  const BASE_URL = 'https://api.vercel.com';
  const ACCESS_TOKEN = storage().get('VERCEL_ACCESS_TOKEN');

  if (!ACCESS_TOKEN) {
    console.error('No access token found');
    Navigate({
      to: '/config',
    });

    return;
  }

  async function _fetch(path: string, options?: RequestInit) {
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
  };
}

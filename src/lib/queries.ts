import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/stores/app';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { createAPIClient } from './api';

function useURLQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export function useDeployments() {
  const api = createAPIClient({
    onErrorToastMessage: 'Failed to fetch deployments',
  });
  const URLQuery = useURLQuery();

  const teamId = URLQuery.get('teamId') || '';

  const query = useQuery(['deployments', teamId], () =>
    api.deployments.list({
      teamId,
    })
  );

  return query;
}

export function useTeams() {
  const api = createAPIClient({
    onErrorToastMessage: 'Failed to fetch teams',
  });
  const { currentAccessToken } = useAppStore();

  const query = useQuery(['teams', currentAccessToken?.id], api.teams.list);

  return query;
}

export function useUser() {
  const api = createAPIClient({
    onErrorToastMessage: 'Failed to fetch user',
  });
  const { currentAccessToken } = useAppStore();

  const query = useQuery(['user', currentAccessToken?.id], api.user.get);

  return query;
}

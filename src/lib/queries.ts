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
  const api = createAPIClient();
  const URLQuery = useURLQuery();

  const teamId = URLQuery.get('teamId') || '';

  const query = useQuery(['deployments', teamId], () =>
    api.deployments.list({
      teamId,
    })
  );

  return query;
}

export function useProjects() {
  const api = createAPIClient();
  const { currentAccount } = useAppStore();

  const query = useQuery(['projects', currentAccount?.id], api.projects.list);

  return query;
}

export function useTeams() {
  const api = createAPIClient();
  const { currentAccount } = useAppStore();

  const query = useQuery(['teams', currentAccount?.id], api.teams.list);

  return query;
}

export function useUser() {
  const api = createAPIClient();
  const { currentAccount } = useAppStore();

  const query = useQuery(['user', currentAccount?.id], api.user.get);

  return query;
}

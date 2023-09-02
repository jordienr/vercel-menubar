import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/stores/app';
import { createAPIClient } from './api';

export function useDeployments() {
  const api = createAPIClient();
  const { currentAccount } = useAppStore();

  const query = useQuery(
    ['deployments', currentAccount?.id],
    api.deployments.list
  );

  return query;
}

export function useProjects() {
  const api = createAPIClient();
  const { currentAccount } = useAppStore();

  const query = useQuery(['projects', currentAccount?.id], api.projects.list);

  return query;
}

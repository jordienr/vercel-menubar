import { useQuery } from '@tanstack/react-query';
import { createAPIClient } from './api';

export function useDeployments() {
  const api = createAPIClient();

  const query = useQuery(['deployments'], api.deployments.list);

  return query;
}

export function useProjects() {
  const api = createAPIClient();

  const query = useQuery(['projects'], api.projects.list);

  return query;
}

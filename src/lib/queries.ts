import { useQuery } from '@tanstack/react-query';
import { createAPIClient } from './api';

export function useDeployments() {
  const api = createAPIClient();

  const query = useQuery(['deployments'], api.deployments.list);

  return query;
}

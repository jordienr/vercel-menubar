import { createAPIClient } from 'lib/api';
import { useEffect, useState } from 'react';
import { Deployment } from '../../types/Deployment';

export function Deployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  const api = createAPIClient();

  useEffect(() => {
    api?.deployments.list().then((dps: any) => {
      setDeployments(dps);

      return deployments;
    });
  });

  return (
    <div>
      <h1>Deployments</h1>
    </div>
  );
}

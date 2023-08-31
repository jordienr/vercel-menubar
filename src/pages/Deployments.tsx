import { createAPIClient } from 'lib/api';
import { useEffect, useState } from 'react';

export function Deployments() {
  const [deployments, setDeployments] = useState([]);

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
      <pre>{JSON.stringify(deployments, null, 2)}</pre>
    </div>
  );
}

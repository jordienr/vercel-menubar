import { useDeployments } from 'lib/queries';

export function Deployments() {
  const { data, isLoading } = useDeployments();

  return (
    <div className="p-4">
      <h1 className="h1">Deployments</h1>
      {isLoading && <p>Loading...</p>}
      <div className="flex flex-col gap-4 mt-4">
        {data?.deployments.map((dep) => {
          return (
            <div className="px-4">
              <div className="font-semibold">{dep.name}</div>
              <a
                target="_blank"
                className="font-mono underline text-xs"
                href={`https://${dep.url}`}
                rel="noreferrer"
              >
                {dep.url}
              </a>
              <div>{dep.state}</div>
              <div>{dep.created}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useDeployments } from 'src/lib/queries';
import { formatDate } from 'src/lib/dates';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Deployment } from '../../types/Deployment';

function StatusDot({ state }: { state: Deployment['state'] }) {
  if (!state) return null;

  const stateMap: Record<typeof state, string> = {
    BUILDING: 'bg-blue-400',
    READY: 'bg-green-400',
    CANCELED: 'bg-gray-400',
    ERROR: 'bg-red-400',
    INITIALIZING: 'bg-yellow-400',
    QUEUED: 'bg-yellow-400',
  };
  return <div className={`w-2 h-2 rounded-full ${stateMap[state]}`} />;
}

export function Deployments() {
  const { data, isLoading } = useDeployments();

  return (
    <MainLayout loading={isLoading} title="Deployments">
      <div className="flex flex-col mt-4 p-3">
        {data?.deployments.map((dep) => {
          return (
            <div
              key={dep.createdAt}
              className="p-4 font-mono text-sm hover:bg-slate-300/20 rounded-xl"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2 items-center">
                  <StatusDot state={dep.state} />
                  <div className="font-semibold">{dep.name}</div>
                </div>
                <div className="text-slate-400">
                  {formatDate(new Date(dep.created), 'DD/MM/YY HH:mm')}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <a
                  target="_blank"
                  className="font-mono underline text-xs"
                  href={`https://${dep.url}`}
                  rel="noreferrer"
                  title={`https://${dep.url}`}
                >
                  Open in browser
                </a>
                <span className="text-slate-400">@{dep.creator.username}</span>
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}

import { useDeployments } from 'src/lib/queries';
import { formatDate } from 'src/lib/dates';
import { MainLayout } from '@/components/layout/MainLayout';
import { ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Debug } from '@/components/Debug';
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
  const location = useLocation();
  return (
    <MainLayout loading={isLoading} title="Deployments">
      <div className="flex flex-col p-3">
        {/* <Debug data={location} /> */}
        {data?.deployments.map((dep) => {
          return (
            <a
              key={dep.createdAt}
              target="_blank"
              className="grid grid-cols-3 justify-between w-full  p-2 rounded-md group hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-sm gap-2 items-center font-mono"
              href={`${dep.inspectorUrl}`}
              rel="noreferrer"
              title={`${dep.inspectorUrl}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <StatusDot state={dep.state} />
                  <div className="font-semibold font-sans">{dep.name}</div>
                </div>
                <div className="ml-4 text-slate-400">{dep.target}</div>
              </div>
              <div className="text-xs">
                <div className="text-slate-400">
                  {formatDate(new Date(dep.created), 'DD/MM/YY HH:mm')}d
                </div>
                <span className="text-slate-400 ml-auto  mr-4">
                  @{dep.creator.username}
                </span>
              </div>
              <div className="pr-3 ml-auto">
                <ExternalLink
                  size="16"
                  className="text-slate-400 flex items-center"
                />
              </div>
            </a>
          );
        })}
      </div>
    </MainLayout>
  );
}

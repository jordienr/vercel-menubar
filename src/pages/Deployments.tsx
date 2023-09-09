/* eslint-disable react/jsx-no-comment-textnodes */
import { useDeployments } from 'src/lib/queries';
import { formatDate } from 'src/lib/dates';
import { MainLayout } from '@/components/layout/MainLayout';
import {
  Clipboard,
  Clock,
  Computer,
  ExternalLink,
  GitBranch,
  Globe,
  Inspect,
  LucideIcon,
  PcCase,
  SquareCode,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Debug } from '@/components/Debug';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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

function DeploymentDuration(dep: Deployment) {
  const { createdAt, buildingAt, ready } = dep;

  if (!createdAt || !buildingAt || !ready) return null;

  const durationMs = new Date(ready).getTime() - new Date(buildingAt).getTime();

  const durationSecs = Math.floor(durationMs / 1000);

  const durationMins = `${Math.floor(durationSecs / 60)}:${`0${
    durationSecs % 60
  }`.slice(-2)}`;

  return (
    <div className="flex font-medium items-center gap-2 text-sm px-2 text-slate-500">
      <Clock size="16" />
      Duration:
      <span className="">{durationMins}</span>
    </div>
  );
}

function getCommitUrl(dep: Deployment) {
  const { meta } = dep;
  if (meta.githubCommitRef && meta.githubCommitSha) {
    return `https://github.com/${meta.githubCommitOrg}/${meta.githubCommitRepo}/commit/${meta.githubCommitSha}`;
  }
}

function LinkItem({
  href,
  children,
  disabled = false,
  Icon,
}: {
  href: string | undefined;
  children: any;
  Icon: LucideIcon;
  disabled?: boolean;
}) {
  return (
    <a
      style={{ opacity: disabled ? 0.5 : 1 }}
      className="group text-slate-500 hover:bg-white hover:text-slate-600 px-2 py-1 rounded-md flex items-center gap-2 font-medium transition-all hover:shadow-sm bg-slate-200"
      target="_blank"
      href={disabled ? '/' : href}
      rel="noreferrer"
    >
      <Icon className="group-hover:text-blue-500" size="18" />
      {children}
    </a>
  );
}
export function Deployments() {
  const { data, isLoading } = useDeployments();

  return (
    <MainLayout
      loading={isLoading}
      title={
        <>
          <PcCase size="16" /> Deployments
        </>
      }
    >
      <div className="flex flex-col">
        {/* <Debug data={location} /> */}
        {/* <Debug data={data?.deployments[0]} /> */}
        <Accordion type="multiple">
          {data?.deployments.map((dep) => {
            return (
              <AccordionItem
                value={dep.uid}
                key={dep.createdAt}
                // href={`${dep.inspectorUrl}`}
              >
                <AccordionTrigger className="p-3 text-sm text-slate-500 dark:text-slate-300">
                  <div className="flex justify-between w-full mr-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <StatusDot state={dep.state} />
                        <div className="font-semibold text-black dark:text-white">
                          {dep.name}
                        </div>
                      </div>
                      <span className="">@{dep.creator.username}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <div className="capitalize">
                        {dep.target || 'preview'}
                      </div>
                      <div className="">
                        {formatDate(new Date(dep.created), 'N X ago')}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3">
                  <div className="flex flex-col gap-2">
                    <DeploymentDuration {...dep} />
                    <div className="grid grid-cols-2 gap-1">
                      <LinkItem Icon={SquareCode} href={dep.inspectorUrl}>
                        Deployment
                      </LinkItem>
                      <LinkItem
                        Icon={SquareCode}
                        href={`${dep.inspectorUrl}/logs`}
                      >
                        Logs
                      </LinkItem>
                      <LinkItem Icon={GitBranch} href={getCommitUrl(dep)}>
                        Commit
                      </LinkItem>

                      <LinkItem
                        disabled={!dep.url && dep.state !== 'ERROR'}
                        Icon={Globe}
                        href={`https://${dep.url}`}
                      >
                        View live
                      </LinkItem>

                      <button
                        type="button"
                        className="flex gap-2 items-center px-2 py-1 font-medium rounded-md text-slate-500 hover:bg-white hover:text-slate-600 transition-all hover:shadow-sm bg-slate-200"
                        onClick={() => {
                          navigator.clipboard.writeText(dep.uid);
                        }}
                      >
                        <Clipboard size="18" />
                        Copy `{dep.meta.githubCommitRef}`
                      </button>
                    </div>
                    <pre className="bg-slate-800 mt-4 text-white py-1 px-2 rounded-md font-mono text-xs text-left overflow-auto">
                      <div className="opacity-50"># commit message</div>
                      <div>
                        <span className="text-blue-400">{'>'}</span>{' '}
                        {dep.meta.githubCommitMessage}
                      </div>
                    </pre>
                    {/* <Debug data={dep.meta} /> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </MainLayout>
  );
}

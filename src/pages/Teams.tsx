import { MainLayout } from '@/components/layout/MainLayout';
import { useTeams } from '@/lib/queries';

export function Teams() {
  const { data, isLoading } = useTeams();

  return (
    <MainLayout title="Teams" loading={isLoading}>
      {data?.teams.map((team: any) => (
        <div className="flex gap-3 p-2">
          <div className="flex items-center">
            <img
              src={`https://vercel.com/api/www/avatar/${team.avatar}`}
              alt={team.name}
              className="rounded-full"
              width="44"
              height="44"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">{team.name}</span>
            <span className="font-mono text-slate-400">{team.slug}</span>
          </div>
        </div>
      ))}

      {/* <Debug data={data} /> */}
    </MainLayout>
  );
}

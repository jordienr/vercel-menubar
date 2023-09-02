import { MainLayout } from '@/components/layout/MainLayout';
import { useProjects } from '@/lib/queries';

export function Projects() {
  const { data, isLoading } = useProjects();

  return (
    <MainLayout title="Projects" loading={isLoading}>
      {data?.projects.map((proj: any) => (
        <div key={proj.id} className="">
          <h3 className="p-2">{proj.name}</h3>
        </div>
      ))}
    </MainLayout>
  );
}

import { MainLayout } from '@/components/layout/MainLayout';
import { useProjects } from '@/lib/queries';

export function Projects() {
  const { data, isLoading } = useProjects();

  return (
    <MainLayout title="Projects" loading={isLoading}>
      projects
      <pre>{JSON.stringify(data)}</pre>
    </MainLayout>
  );
}

import { MainLayout } from '@/components/layout/MainLayout';
import { useProjects } from '@/lib/queries';

export function Projects() {
  // const { data, isLoading } = useProjects();

  // if (isLoading) return <div>Loading...</div>;
  return (
    <MainLayout title="Projects">
      projects
      {/* <pre>{JSON.stringify(data)}</pre> */}
    </MainLayout>
  );
}

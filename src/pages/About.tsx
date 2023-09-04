import { MainLayout } from '@/components/layout/MainLayout';

export function About() {
  return (
    <MainLayout title="About">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-medium">Vercel Menubar</h1>
        <p className="body-text">
          Vercel Menubar is an open source project created by{' '}
          <a className="link" href="https://github.com/jordienr">
            Jordi Enric
          </a>
        </p>
        <p className="body-text">
          You can find the source code for this project on{' '}
          <a className="link" href="https://github.com/jordienr/vercel-menubar">
            Github{' '}
          </a>
        </p>
      </div>
    </MainLayout>
  );
}

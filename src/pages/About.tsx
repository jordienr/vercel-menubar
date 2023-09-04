import { MainLayout } from '@/components/layout/MainLayout';

export function About() {
  return (
    <MainLayout title="About">
      <div className="prose p-4">
        <h1>Vercel Menubar</h1>
        <p>
          Vercel Menubar is an open source project created by{' '}
          <a href="https://github.com/jordienr">Jordi Enric</a>
        </p>
        <p>
          You can find the source code for this project on{' '}
          <a href="https://github.com/jordienr/vercel-menubar">Github </a>
        </p>
        <h2>Special thanks</h2>
        <ul>
          <li>
            Shadcn for creating <a href="https://ui.shadcn.com/">Shadcn UI</a>
          </li>
          <li>
            <a href="https://twitter.com/emilkowalski_">Emil Kowalski</a> for
            creating <a href="https://sonner.emilkowal.ski/">Sonner</a>
          </li>
          <li>
            <a href="https://github.com/electron-react-boilerplate/electron-react-boilerplate">
              Electron React Boilerplate
            </a>
          </li>
          <li>
            <a href="https://tailwindcss.com/">TailwindCSS</a>
          </li>
          <li>
            <a href="https://tanstack.com/query/v3/">
              React Query by the Tan Stack team
            </a>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
}

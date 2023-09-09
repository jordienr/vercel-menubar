import { OutsideLink } from '@/components/OutsideLink';
import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <MainLayout title="About">
      <div className="prose p-4">
        <h1>Vercel Menubar</h1>
        <p>
          Vercel Menubar is an open source project created by{' '}
          <OutsideLink href="https://github.com/jordienr">
            Jordi Enric
          </OutsideLink>
        </p>
        <p>
          You can find the source code for this project on{' '}
          <OutsideLink href="https://github.com/jordienr/vercel-menubar">
            Github
          </OutsideLink>
        </p>
        <p>Consider starring the project if you like it!</p>
        <h2>Feedback</h2>
        <p>
          If you have any feedback, please reach out to me on{' '}
          <OutsideLink href="https://twitter.com/jordienr">Twitter</OutsideLink>{' '}
          or open an issue on{' '}
          <OutsideLink href="https://github.com/jordienr/vercel-menubar/issues">
            Github
          </OutsideLink>
        </p>
        <h2>Special thanks</h2>
        <ul>
          <li>
            Vercel, for offering a great platform and API to build on top of
          </li>
          <li>
            Shadcn for creating{' '}
            <OutsideLink href="https://ui.shadcn.com/">Shadcn UI</OutsideLink>
          </li>
          <li>
            <OutsideLink href="https://twitter.com/emilkowalski_">
              Emil Kowalski
            </OutsideLink>{' '}
            for creating{' '}
            <OutsideLink href="https://sonner.emilkowal.ski/">
              Sonner
            </OutsideLink>
          </li>
          <li>
            <OutsideLink href="https://github.com/electron-react-boilerplate/electron-react-boilerplate">
              Electron React Boilerplate
            </OutsideLink>
          </li>
          <li>
            <OutsideLink href="https://tailwindcss.com/">
              TailwindCSS
            </OutsideLink>
          </li>
          <li>
            <OutsideLink href="https://tanstack.com/query/latest/">
              React Query by the Tan Stack team
            </OutsideLink>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
}

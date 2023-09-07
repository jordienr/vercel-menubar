import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import { Deployments } from 'src/pages/Deployments';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { About } from '@/pages/About';
import { Toaster } from 'sonner';
import { Start } from '@/pages/Start';
import { Settings } from '../pages/Settings';
import 'tailwindcss/tailwind.css';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/deployments/:teamId" element={<Deployments />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

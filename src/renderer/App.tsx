import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Deployments } from 'src/pages/Deployments';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { About } from '@/pages/About';
import { Toaster } from 'sonner';
import { Settings } from '../pages/Settings';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Deployments />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/deployments/:teamId" element={<Deployments />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

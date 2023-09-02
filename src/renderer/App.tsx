import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Deployments } from 'src/pages/Deployments';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { About } from '@/pages/About';
import { Projects } from '@/pages/Projects';
import { Settings } from '../pages/Settings';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

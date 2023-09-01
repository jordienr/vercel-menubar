import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Deployments } from 'src/pages/Deployments';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { About } from '@/pages/About';
import { Config } from '../pages/Config';

function Hello() {
  return (
    <MainLayout title="Vercel menubar">
      <div className="grid grid-cols-3">
        <Link to="/deployments">Deployments</Link>
        <Link to="/config">Config</Link>
      </div>
    </MainLayout>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/config" element={<Config />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

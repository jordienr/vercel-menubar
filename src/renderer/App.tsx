import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Deployments } from 'pages/Deployments';
import { Config } from './Config';

function Hello() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Vercel Menubar</h1>
      <div className="grid grid-cols-3">
        <Link to="/deployments">Deployments</Link>
        <Link to="/config">Config</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </Router>
  );
}

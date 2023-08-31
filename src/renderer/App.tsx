import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Config } from './Config';

function Hello() {
  return (
    <div>
      <h1>Vercel Menubar</h1>
      <Link to="/config">Config</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </Router>
  );
}

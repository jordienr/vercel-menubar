import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Config() {
  const [vat, setVat] = useState(window.localStorage.getItem('vat') || '');

  function onSubmit(e: any) {
    e.preventDefault();
    window.localStorage.setItem('vat', vat);
  }

  return (
    <>
      <h1>Config</h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label htmlFor="vat">
          Vercel Access Token
          <input
            type="text"
            name="vat"
            value={vat}
            onChange={(e) => setVat(e.target.value)}
            id="vat"
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <Link to="/">Back</Link>
    </>
  );
}

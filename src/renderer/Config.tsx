import { storage } from 'lib/storage';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Config() {
  const [vat, setVat] = useState(window.localStorage.getItem('vat') || '');

  function onSubmit(e: any) {
    e.preventDefault();
    storage().set('VERCEL_ACCESS_TOKEN', vat);
  }

  return (
    <div className="p-4">
      <Link to="/">Back</Link>

      <h1 className="text-xl font-semibold">Config</h1>
      <form className="flex flex-col mt-4" onSubmit={onSubmit}>
        <label htmlFor="vat" className="flex flex-col">
          Vercel Access Token
          <input
            className="border border-gray-300 rounded-md p-2 mt-2"
            type="text"
            name="vat"
            value={vat}
            onChange={(e) => setVat(e.target.value)}
            id="vat"
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

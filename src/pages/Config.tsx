import { Link } from 'react-router-dom';
import { createId } from '@/lib/utils';
import { useAppStore } from '@/stores/app';
import { MainLayout } from '@/components/layout/MainLayout';

export function Config() {
  const { accounts, addAccount, removeAccount } = useAppStore();

  function onSubmit(e: any) {
    e.preventDefault();
    const name = e.target.name.value;
    const token = e.target.token.value;
    const id = createId();

    addAccount({
      id,
      name,
      token,
    });

    e.target.reset();
  }

  function deleteAccount(id: string) {
    removeAccount(id);
  }
  return (
    <MainLayout title="Config">
      <div className="p-4">
        <h2 className="text-xl font-medium mt-4">Accounts</h2>
        {accounts?.length === 0 && <p>No accounts</p>}
        {accounts && accounts.length > 0 && (
          <ul className="mt-4 flex flex-col gap-4">
            {accounts.map((account) => (
              <li className="flex gap-4" key={account.id}>
                <p>{account.name}</p>
                <button
                  className="text-sm px-2 py-1 rounded-md border"
                  type="button"
                  onClick={() => deleteAccount(account.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <form className="flex flex-col mt-4 gap-3" onSubmit={onSubmit}>
          <h3 className="text-xl font-medium">Add an account</h3>
          <label className="label" htmlFor="name">
            Name
            <input
              placeholder="Can be anything"
              className="input"
              type="text"
              name="name"
            />
          </label>
          <label className="label" htmlFor="token">
            Token
            <input
              placeholder="Vercel Access Token"
              className="input"
              type="password"
              name="token"
            />
            <caption className="normal-case">
              <a
                target="_blank"
                className="text-blue-300 underline p-3 block"
                href="https://vercel.com/account/tokens"
                rel="noreferrer"
              >
                Create a token on Vercel.com
              </a>
            </caption>
          </label>
          <button className="btn" type="submit">
            Add account
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

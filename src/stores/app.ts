import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Account = {
  id: string;
  name: string;
  token: string;
  color: {
    value: string;
  };
};

interface AppStore {
  accounts: Account[];
  currentAccount: Account | undefined;
  setCurrentAccount: (account: Account) => void;
  addAccount: (account: Account) => void;
  removeAccount: (id: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      accounts: [],
      currentAccount: undefined,
      setCurrentAccount: (account: Account) => {
        set({ currentAccount: account });
      },
      getAccounts: () => {
        const { accounts } = get();
        return accounts;
      },
      addAccount: (account: Account) => {
        const { accounts } = get();
        set({ accounts: [...accounts, account] });
      },
      removeAccount: (id: string) => {
        const { accounts } = get();
        set({ accounts: accounts.filter((account) => account.id !== id) });
      },
    }),
    {
      name: 'app-storage',
    }
  )
);

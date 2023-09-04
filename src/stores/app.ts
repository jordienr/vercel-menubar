import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AccessToken = {
  id: string;
  name: string;
  token: string;
};

interface AppStore {
  accessTokens: AccessToken[];
  currentAccessToken: AccessToken | undefined;
  setCurrentAccessToken: (at: AccessToken) => void;
  addAccessToken: (at: AccessToken) => void;
  removeAccessToken: (token: AccessToken) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      accessTokens: [],
      currentAccessToken: undefined,
      setCurrentAccessToken: (at: AccessToken) => {
        set({ currentAccessToken: at });
      },
      addAccessToken: (at: AccessToken) => {
        set((state) => ({
          accessTokens: [...state.accessTokens, at],
        }));
      },
      removeAccessToken: (token: AccessToken) => {
        set((state) => ({
          accessTokens: state.accessTokens.filter(
            (at) => at.token !== token.token
          ),
        }));
      },
    }),
    {
      name: 'app-storage',
    }
  )
);

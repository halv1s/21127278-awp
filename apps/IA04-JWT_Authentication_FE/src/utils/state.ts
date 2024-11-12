import { proxy } from 'valtio';

interface AppState {
  isAuthenticated: boolean;
  username?: string;
}

export const appState = proxy<AppState>({
  isAuthenticated: false,
});

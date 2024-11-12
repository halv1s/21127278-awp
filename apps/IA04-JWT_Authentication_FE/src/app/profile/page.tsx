'use client';

import ProtectedRoute from '@/components/protected-route';
import { appState } from '@/utils/state';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';

export default function ProfilePage() {
  const { username } = useSnapshot(appState);
  const router = useRouter();

  const signOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (response.ok) {
        appState.isAuthenticated = false;
        appState.username = '';
        router.push('/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="grid place-items-center">
        <h1 className="text-2xl">
          Welcome, <span className="text-purple-500">{username}</span>
        </h1>
        <button
          onClick={signOut}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </ProtectedRoute>
  );
}

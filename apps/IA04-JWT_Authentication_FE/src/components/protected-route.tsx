'use client';

import { appState } from '@/utils/state';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { useSnapshot } from 'valtio';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated } = useSnapshot(appState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/profile`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (res.ok) {
          appState.isAuthenticated = true;
          const data = await res.json();
          appState.username = data.username;
        } else {
          appState.isAuthenticated = false;
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        appState.isAuthenticated = false;
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <>{children}</> : null;
}

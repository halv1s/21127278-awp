import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootScreen from './routes/Root.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PhotoDetailsScreen from './routes/PhotoDetails.tsx';
import NotFoundScreen from './routes/NotFound.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootScreen />,
    errorElement: <NotFoundScreen />,
  },
  {
    path: '/photos/:id',
    element: <PhotoDetailsScreen />,
    errorElement: <NotFoundScreen />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

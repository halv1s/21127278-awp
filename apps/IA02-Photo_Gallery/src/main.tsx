import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFoundScreen from './routes/NotFound.tsx';
import RootScreen from './routes/Root.tsx';
import PhotoDetailsScreen from './routes/PhotoDetails.tsx';
import PhotosScreen from './routes/Photos.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootScreen />,
    errorElement: <NotFoundScreen />,
    children: [
      {
        index: true,
        element: <Navigate to="/photos" replace />,
      },
      {
        path: '/photos',
        element: <PhotosScreen />,
      },
      {
        path: '/photos/:id',
        element: <PhotoDetailsScreen />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

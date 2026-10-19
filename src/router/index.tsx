import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/404'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ScanPage from '../pages/ScanPage'
import ScanAddedPage from '../pages/ScanAddedPage'
import ScanFailedPage from '../pages/ScanFailedPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/scan/added',
        element: <ScanAddedPage />,
      },
      {
        path: '/scan/failed',
        element: <ScanFailedPage />,
      },
    ],
  },
  {
    path: '/scan',
    element: <ScanPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

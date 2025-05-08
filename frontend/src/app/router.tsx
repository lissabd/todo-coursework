// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { RedirectIfAuth, RequireAuth, RequireAdmin } from './RouteGuards';
import TodoDetailsPage from '../pages/TodoDetails/TodoDetailsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import AdminPage from '../pages/Admin/AdminPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import AppLayout from '../widget/layout/AppLayout';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import QuestionsPage from '../pages/Questions/QuestionsPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: 'todos/:id',
        element: (
          <RequireAuth>
            <TodoDetailsPage />
          </RequireAuth>
        ),
      },
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: 'settings',
        element: (
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        ),
      },
      {
        path: 'questions',
        element: (
          <RequireAuth>
            <QuestionsPage />
          </RequireAuth>
        ),
      },
      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <RedirectIfAuth>
        <LoginPage />
      </RedirectIfAuth>
    ),
  },
  {
    path: '/register',
    element: (
      <RedirectIfAuth>
        <RegisterPage />
      </RedirectIfAuth>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

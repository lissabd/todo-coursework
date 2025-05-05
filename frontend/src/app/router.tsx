// import { createBrowserRouter } from "react-router-dom";
// import LoginPage from "../pages/Login/LoginPage";
// import RegisterPage from "../pages/Register/RegisterPage";
// import HomePage from "../pages/Home/HomePage";
// import ProfilePage from "../pages/Profile/ProfilePage";
// import { PrivateRoute } from "./PrivateRoute";



// export const router = createBrowserRouter([
//   { path: "/login", element: <LoginPage /> },
//   { path: "/register", element: <RegisterPage /> },
//   {
//     path: "/",
//     element: (
//       <PrivateRoute>
//         <HomePage />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: "/profile",
//     element: (
//       <PrivateRoute>
//         <ProfilePage />
//       </PrivateRoute>
//     ),
//   },
// ]);
// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { RedirectIfAuth, RequireAdmin, RequireAuth } from './RouteGuards';
import TodoListPage from '../pages/TodoList/TodoListPage';
import TodoDetailsPage from '../pages/TodoDetails/TodoDetailsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import AdminPage from '../pages/Admin/AdminPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import AppLayout from '../widget/layout/AppLayout';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <TodoListPage />
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

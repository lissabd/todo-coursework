// src/pages/Dashboard/DashboardPage.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AdminPage from '../Admin/AdminPage';
import TodoListPage from '../TodoList/TodoListPage';

export default function DashboardPage() {
  const user = useSelector((s: RootState) => s.auth.user);
  if (!user) return null;

  return user.role === 'admin' ? <AdminPage /> : <TodoListPage />;
}

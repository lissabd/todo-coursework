import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from './store';

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props): JSX.Element | null => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const RequireAdmin = ({ children }: Props): JSX.Element | null => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const RedirectIfAuth = ({ children }: Props): JSX.Element | null => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

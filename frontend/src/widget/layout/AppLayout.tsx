import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Box } from '@mui/material';
import Header from '../header/Header';
import SideBar from '../sidebar/SideBar';

const AppLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const hideAppBarRoutes = ['/login', '/register'];
  const hideAppBar = hideAppBarRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated && !hideAppBar && <SideBar open={isSidebarOpen} />}

      <Box sx={{ flexGrow: 1 }}>
        {!hideAppBar && <Header toggleSidebar={toggleSidebar} />}
        <Box component="main" sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;


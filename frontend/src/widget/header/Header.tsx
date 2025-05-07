// src/widgets/Header.tsx
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { logout } from '../../features/auth/model/authSlice';
import { todoApi } from '../../entities/todo/api/todoApi';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);

  const onLogout = () => {
    dispatch(todoApi.util.resetApiState());
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Todo App
        </Typography>
        {user ? (
          <>
            <Typography sx={{ mr: 2 }}>{user.name}</Typography>
            <Button color="inherit" onClick={onLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

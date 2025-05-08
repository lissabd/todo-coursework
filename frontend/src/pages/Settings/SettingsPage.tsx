// src/pages/Settings/SettingsPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { useDeleteUserMutation } from '../../entities/user/api/userApi';
import { logout } from '../../features/auth/model/authSlice';
import { todoApi } from '../../entities/todo/api/todoApi';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const authUser = useSelector((s: RootState) => s.auth.user)!;
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteUser(+authUser.id).unwrap();
    dispatch(todoApi.util.resetApiState());
    dispatch(logout());
    navigate('/register');
  };

  return (
    <Box
      maxWidth="500px"
      mx="auto"
      mt={4}
      bgcolor="background.paper"
      borderRadius={2}
      p={3}
    >
      <Typography variant="h5" gutterBottom>
        Настройки
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Удалить аккаунт" />
      </Tabs>
      {tab === 0 && (
        <Box mt={2}>
          <Typography mb={2}>
            Вы действительно хотите удалить аккаунт? Все данные будут
            безвозвратно потеряны.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setConfirmOpen(true)}
          >
            Удалить аккаунт
          </Button>
        </Box>
      )}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <Typography>Аккаунт будет удалён навсегда. Вы уверены?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Отмена</Button>
          <Button onClick={handleDelete} color="error" disabled={isLoading}>
            {isLoading ? 'Удаление...' : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;

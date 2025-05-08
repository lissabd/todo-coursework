// src/pages/Profile/ProfilePage.tsx
import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  useMeQuery,
  useUpdateNameMutation,
  useUploadAvatarMutation,
} from '../../entities/user/api/userApi';
import { loginSuccess } from '../../features/auth/model/authSlice';
import { useDispatch } from 'react-redux';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((s: RootState) => s.auth.user)!;
  const { data: user, isLoading } = useMeQuery();
  const [name, setName] = useState('');
  const [updateName] = useUpdateNameMutation();
  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (isLoading) return <CircularProgress />;

  const onChangeName = async () => {
    if (!user) return;
    await updateName({ id: user.id, name }).unwrap();
    dispatch(loginSuccess({ ...authUser, name }));
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.length) return;
    const file = e.target.files[0];
    const res = await uploadAvatar({ id: user.id, file }).unwrap();
    dispatch(loginSuccess({ ...authUser, avatar: res.filename }));
  };

  return (
    <Box
      maxWidth="400px"
      mx="auto"
      mt={4}
      p={3}
      bgcolor="background.paper"
      borderRadius={2}
    >
      <Typography variant="h5" gutterBottom>
        Профиль
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        <Avatar
          src={
            user?.avatar
              ? `http://localhost:8000/uploads/avatars/${user.avatar}`
              : undefined
          }
          sx={{ width: 80, height: 80 }}
        />
        <Button variant="outlined" component="label" disabled={uploading}>
          {uploading ? 'Загрузка...' : 'Сменить аватар'}
          <input type="file" hidden accept="image/*" onChange={onFileChange} />
        </Button>
        <TextField
          label="Имя"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField label="Email" fullWidth value={user?.email} disabled />
        <Button variant="contained" fullWidth onClick={onChangeName}>
          Сохранить изменения
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;

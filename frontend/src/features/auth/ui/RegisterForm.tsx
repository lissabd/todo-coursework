import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../model/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Stack } from '@mui/material';
import { AppDispatch } from '../../../app/store';
import { todoApi } from '../../../entities/todo/api/todoApi';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };

    if (!name) newErrors.name = 'Имя не может быть пустым';
    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = await authApi.register(email, password, name);
      localStorage.setItem('token', data.token);
      dispatch(todoApi.util.resetApiState());
      dispatch(loginSuccess(data.user));
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Ошибка регистрации');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth="400px"
      margin="auto"
      mt={30}
      p={4}
      borderRadius={2}
      boxShadow={3}
      bgcolor="background.paper"
    >
      <Typography variant="h4" textAlign={'center'}>
        Регистрация
      </Typography>
      <TextField
        label="Имя"
        value={name}
        onChange={e => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" variant="contained">
        Зарегистрироваться
      </Button>
      <Stack direction={'row'} spacing={3} justifyContent={'center'}>
        <Typography>Уже есть аккаунт?</Typography>
        <Link to={'/login'} style={{ textDecoration: 'none' }}>
          Войти
        </Link>
      </Stack>
    </Box>
  );
};

export default RegisterForm;

import { useGetTodosQuery, useAddTodoMutation } from '../../entities/todo/api/todoApi';
import TodoListCard from '../../entities/todo/ui/TodoListCard';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useState } from 'react';

const TodoListPage = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    if (title.trim() && userId) {
      await addTodo({ title, userId: Number(userId) });
      setTitle('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Списки дел
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        <TextField
          label="Новый список"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd} disabled={!title.trim()}>
          Добавить
        </Button>
      </Box>

      {isLoading ? (
        <Typography textAlign="center">Загрузка...</Typography>
      ) : todos && todos.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {todos.map((todo) => (
            <Box key={todo.id} flex="1 1 300px" maxWidth="300px">
              <TodoListCard todo={todo} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            mt: 8,
            py: 6,
            px: 2,
            borderRadius: 2,
            backgroundColor: '#161b22',
            border: '1px dashed #30363d',
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            У вас пока нет списков дел
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            Создайте свой первый список, чтобы начать.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TodoListPage;

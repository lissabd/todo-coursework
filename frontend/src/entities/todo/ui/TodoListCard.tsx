// src/entities/todo/ui/TodoListCard.tsx

import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { TodoList } from '../model/types';
import { useNavigate } from 'react-router-dom';
import { useDeleteTodoMutation } from '../api/todoApi';

type Props = { todo: TodoList };

const TodoListCard = ({ todo }: Props) => {
  const navigate = useNavigate();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{todo.title}</Typography>
        <Box mt={1} display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={() => navigate(`/todos/${todo.id}`)}
          >
            Открыть
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteTodo(todo.id)}
          >
            Удалить
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoListCard;

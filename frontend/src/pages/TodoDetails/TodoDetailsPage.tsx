
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import {  useGetTodoQuery, useUpdateTodoMutation,  } from '../../entities/todo/api/todoApi';


export const TodoDetailPage = () => {
  const { id } = useParams();
  const { data: todo } = useGetTodoQuery(Number(id));
  const [updateTodo] = useUpdateTodoMutation();

  const [title, setTitle] = useState('');
  const [todoItems, setTodoItems] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setTodoItems(todo.todoItems || []);
    }
  }, [todo]);

  const handleTaskChange = (index: number, field: 'text' | 'completed', value: string | boolean) => {
    const updatedTasks = [...todoItems];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTodoItems(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(), // временный id
        text: newTaskText.trim(),
        completed: false,
      };
      setTodoItems((prev) => [...prev, newTask]);
      setNewTaskText('');
    }
  };

  const handleDeleteTask = (id: number) => {
    setTodoItems((prev) => prev.filter((task) => task.id !== id));
  };

 


  const handleSaveChanges = async () => {
    try {
      const updatedTodoItems = todoItems.map((task) => {
        if (!task.id) {
          throw new Error('Все задачи должны иметь id');
        }
        return task;
      });
  

      await updateTodo({
        id: Number(id),
        title,
        todoItems: updatedTodoItems,
      }).unwrap();
  
      console.log('Данные успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };
  
  
  
  

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Редактирование списка дел
      </Typography>

      
      <Typography variant='h5'>Название списка: {title}</Typography>

      <Box display="flex" gap={2} mb={2} mt={2}>
        <TextField
          label="Новая задача"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddTask}>
          Добавить
        </Button>
      </Box>

      {todoItems.length === 0 ? (
        <Typography variant="body1" sx={{ mb: 2 }}>
          Пока нет ни одной задачи. Добавьте первую!
        </Typography>
      ) : (
        todoItems.map((task, index) => (
          <Box key={task.id} display="flex" alignItems="center" gap={2} mb={2}>
            <Checkbox
              checked={task.completed}
              onChange={(e) => handleTaskChange(index, 'completed', e.target.checked)}
            />
            <TextField
              value={task.text}
              onChange={(e) => handleTaskChange(index, 'text', e.target.value)}
              fullWidth
            />
            <Button color="error" onClick={() => handleDeleteTask(task.id)}>
              Удалить
            </Button>
          </Box>
        ))
      )}

      <Button variant="contained" onClick={handleSaveChanges}>
        Сохранить изменения
      </Button>
    </Container>
  );
};

export default TodoDetailPage

// src/pages/Admin/AdminPage.tsx
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import {
  useGetAllUsersQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation,
} from '../../entities/user/api/userApi';

export default function AdminPage() {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (isLoading) return <CircularProgress />;

  const onRoleChange = async (id: number, event: SelectChangeEvent) => {
    await updateRole({ id, role: event.target.value }).unwrap();
  };

  const onDeleteClick = (id: number) => {
    setUserIdToDelete(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (userIdToDelete !== null) {
      await deleteUser(userIdToDelete).unwrap();
      setOpenDialog(false);
      setUserIdToDelete(null);
      setOpenSnackbar(true);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setUserIdToDelete(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box maxWidth="900px" mx="auto" mt={4} px={2}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Панель администратора
      </Typography>

      <Table
        sx={{
          background: 'background.paper',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Select
                  value={u.role}
                  onChange={e => onRoleChange(u.id, e)}
                  size="small"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onDeleteClick(u.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить этого пользователя? Это действие
            нельзя отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Отмена</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Пользователь успешно удалён!
        </Alert>
      </Snackbar>
    </Box>
  );
}

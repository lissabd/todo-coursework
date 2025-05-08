import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Home,
  Person,
  Settings,
  QuestionAnswerOutlined,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  open: boolean;
}

const SideBar = ({ open }: SideBarProps) => {
  const navigate = useNavigate();

  const items = [
    { text: 'Мои списки', icon: <Home />, path: '/' },
    { text: 'Профиль', icon: <Person />, path: '/profile' },
    { text: 'Настройки', icon: <Settings />, path: '/settings' },
    { text: 'FAQ', icon: <QuestionAnswerOutlined />, path: '/questions' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 200 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 200 : 60,
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <List>
        {items.map(({ text, icon, path }) => (
          <Tooltip title={open ? '' : text} placement="right" key={text}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                {open && (
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{ noWrap: true }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;

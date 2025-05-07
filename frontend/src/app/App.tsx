import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";

import { router } from "./router";
import { AppDispatch, store } from "./store";
import { checkAuth } from "../features/auth/model/authSlice";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0d1117', paper: '#161b22' },
    text: { primary: '#c9d1d9', secondary: '#8b949e' },
    primary: { main: '#238636' },
    error: { main: '#da3633' },
    divider: '#30363d',
  },
  typography: {
    fontFamily: `"Segoe UI", "Roboto", sans-serif`,
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
        },
      },
    },
  },
});

function AppInner() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(checkAuth());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppInner/>
      </ThemeProvider>
    </Provider>
  );
}
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../features/auth/model/authSlice";
import { store } from "./store";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d1117', // фон всей страницы
      paper: '#161b22',   // карточки, модалки и т.д.
    },
    text: {
      primary: '#c9d1d9', // основной текст
      secondary: '#8b949e',
    },
    primary: {
      main: '#238636', // зелёный GitHub (например, кнопка Create)
    },
    error: {
      main: '#da3633', // красный GitHub
    },
    divider: '#30363d',
  },
  typography: {
    fontFamily: `"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif`,
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


function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(checkAuth());
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

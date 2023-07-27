import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#a026ff",
      light: "#b14dff",
      dark: "#8f00ff",
    },
    secondary: {
      main: "#a026ff",
      light: "#b14dff",
      dark: "#8f00ff"
    },
    background: {
      default: "#fffff",
      paper: "#d299ff"
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#8f00ff"
        }
      }
    },
    MuiCheckbox:{
      styleOverrides: {
        root: {
          color: "#8f00ff"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#8f00ff"
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#8f00ff"
        }
      }
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
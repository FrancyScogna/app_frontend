import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffff",
      light: "#ffff",
      dark: "#ffff",
      contrastText: "#ffff"
    },
    secondary: {
      main: "#392759",
      light: "#231e3e",
      dark: "#c7bdff"
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme} >
      <App />
  </ThemeProvider>
);

reportWebVitals();
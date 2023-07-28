import { createTheme } from '@mui/material/styles';

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

export default theme;
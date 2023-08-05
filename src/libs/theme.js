import { createTheme } from '@mui/material/styles';

const breakpointsValues = {
  values: {
    mobile: 0,
    ipad: 815,
    desktop: 1015,
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }
}

export const lightTheme = createTheme({
    breakpoints: {
      ...breakpointsValues
    },
    palette: {
      primary: {
        main: "#a026ff",
        light: "#c9a0dc",
        dark: "#6902ba"
      },
      secondary: {
        main: "#a026ff",
        light: "#c9a0dc",
        dark: "#8f00ff"
      },
      background: {
        default: "#fffff",
        paper: "#d299ff",
        paper_1: "#9526ed"
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
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "#8f00ff"
          }
        }
      }
    },
  });

export const darkTheme = createTheme({
    breakpoints: {
      ...breakpointsValues
    },
    palette: {
      primary: {
        main: "#6902ba",
        light: "#6902ba",
        dark: "#6902ba"
      },
      secondary: {
        main: "#a026ff",
        light: "#c9a0dc",
        dark: "#8f00ff"
      },
      background: {
        default: "#fffff",
        paper: "#6902ba",
        paper_1: "#6902ba"
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
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "#8f00ff"
          }
        }
      }
    },
  });
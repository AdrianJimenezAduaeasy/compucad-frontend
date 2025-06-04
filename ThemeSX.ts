import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        h2: {
          fontSize: '2rem',
          color: 'white',
          '@media (min-width:600px)': {
            fontSize: '1rem', 
          },
          '@media (min-width:900px)': {
            fontSize: '1.5rem', 
          },
          '@media (min-width:1200px)': {
            fontSize: '2rem',
          },
        },
      },
    },
  },
});
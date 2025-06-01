import { blueGrey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// ==================================================

const theme = createTheme({
  palette: {
    primary: { main: blueGrey['A100'] },
    secondary: { main: '#F0F8FF' },
  },
});

// ==================================================

export default theme;

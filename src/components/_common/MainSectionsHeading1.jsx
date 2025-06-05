import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { headingSizes } from '/src/constants';

// ==================================================

function MainSectionsHeading1({ children }) {
  return (
    <Paper
      className="MainSectionsHeading1"
      elevation={12}
      sx={{
        width: { xs: 'stretch', sm: 'fit-content' },
        padding: { xs: '6em 0', sm: '6em' },
        backgroundColor: 'primary.main',
      }}
    >
      <Typography
        component="h1"
        color="secondary.dark"
        sx={{ typography: headingSizes.h1 }}
      >
        {children}
      </Typography>
    </Paper>
  );
}

// ==================================================

export default MainSectionsHeading1;

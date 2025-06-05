import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { headingSizes } from '/src/constants';

// ==================================================

function MainSectionsHeading2({ children }) {
  return (
    <Paper
      className="MainSectionsHeading1"
      elevation={12}
      sx={{
        width: { xs: 'stretch', sm: 'fit-content' },
        padding: { xs: '3em 0', sm: '3em' },
        backgroundColor: 'primary.main',
      }}
    >
      <Typography
        component="h2"
        color="secondary.dark"
        sx={{ typography: headingSizes.h2 }}
      >
        {children}
      </Typography>
    </Paper>
  );
}

// ==================================================

export default MainSectionsHeading2;

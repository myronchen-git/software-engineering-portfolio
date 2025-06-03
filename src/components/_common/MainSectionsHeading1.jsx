import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// ==================================================

function MainSectionsHeading1({ children }) {
  return (
    <Paper
      className="MainSectionsHeading1"
      elevation={12}
      sx={{
        width: { xs: 'stretch', sm: 'fit-content' },
        padding: { xs: '6em 0', sm: '6em' },
      }}
    >
      <Typography variant="h1">{children}</Typography>
    </Paper>
  );
}

// ==================================================

export default MainSectionsHeading1;

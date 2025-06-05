import Typography from '@mui/material/Typography';
import { headingSizes } from '/src/constants';

// ==================================================

function H2({ children }) {
  return (
    <Typography
      component="h2"
      gutterBottom
      color="secondary.dark"
      sx={{
        typography: headingSizes.h2,
      }}
    >
      {children}
    </Typography>
  );
}

// ==================================================

export default H2;

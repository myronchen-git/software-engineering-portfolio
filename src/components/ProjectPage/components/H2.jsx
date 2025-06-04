import Typography from '@mui/material/Typography';

// ==================================================

function H2({ children }) {
  return (
    <Typography
      variant="h2"
      gutterBottom
      color="secondary.dark"
      sx={{
        textDecoration: 'underline dotted 0.1em',
        fontWeight: 'bold',
      }}
    >
      {children}
    </Typography>
  );
}

// ==================================================

export default H2;

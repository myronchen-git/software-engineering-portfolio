import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';

// ==================================================

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  margin: '1em',
  padding: '1em',
  textDecoration: 'none',
}));

// ==================================================

export default NavLink;

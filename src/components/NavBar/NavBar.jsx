import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import NavLink from './components/NavLink';
import logo from '/src/assets/logo.svg';

// ==================================================

const sections = ['About', 'Skills', 'Projects'];

function NavBar() {
  const styles = { '& img.logo': { cursor: 'pointer' } };

  return (
    <AppBar className="NavBar" position="sticky" component="nav" sx={styles}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <a href="/">
          <img src={logo} className="logo" alt="logo" width="32" />
        </a>
        <Box>
          {sections.map((section) => (
            <NavLink key={section} href={`#${section.toLowerCase()}`}>
              {section}
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// ==================================================

export default NavBar;

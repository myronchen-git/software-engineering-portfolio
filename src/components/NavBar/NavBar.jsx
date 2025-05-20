import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import NavLink from './components/NavLink';

// ==================================================

const sections = ['About', 'Skills', 'Projects'];

function NavBar() {
  return (
    <AppBar className="NavBar" position="sticky" component="nav">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        logo
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

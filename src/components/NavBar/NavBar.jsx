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
    <AppBar
      className="NavBar"
      position="sticky"
      component="nav"
      color="secondary"
      sx={styles}
    >
      <Toolbar sx={{ height: '5em', justifyContent: 'space-between' }}>
        <a href="/">
          <img src={logo} className="logo" alt="logo" width="32" />
        </a>
        <Box
          sx={{
            background:
              'url("/src/assets/conveyor_roller_side.svg") bottom/8px repeat-x',
          }}
        >
          {sections.map((section) => (
            <Box
              key={section}
              sx={{
                display: 'inline-block',
                height: '4.5em',
                paddingTop: '1em',
                '&:hover': {
                  background:
                    'url("/src/assets/cardboard_box_side.svg") ' +
                    'center 90%/25% no-repeat',
                },
              }}
            >
              <NavLink href={`#${section.toLowerCase()}`}>{section}</NavLink>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// ==================================================

export default NavBar;

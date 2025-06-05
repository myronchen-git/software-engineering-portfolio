import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';

import Logo from './components/Logo';
import NavLink from './components/NavLink';

// ==================================================

const sections = ['About', 'Skills', 'Projects'];

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --------------------------------------------------

  const styles = { '& img.logo': { cursor: 'pointer' } };

  const handleMenuToggle = () => setIsMobileMenuOpen((prevState) => !prevState);

  // --------------------------------------------------

  /**
   * Menu icon for small screens.
   */
  const menuIconElement = (
    <Box sx={{ display: { sm: 'none' } }}>
      <IconButton aria-label="menu" size="large" onClick={handleMenuToggle}>
        <MenuIcon fontSize="large" />
      </IconButton>
    </Box>
  );

  /**
   * Navigation links for bigger screens.
   */
  const regularMenu = (
    <Box
      sx={{
        display: { xs: 'none', sm: 'initial' },
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
  );

  /**
   * Nav menu for small screens.
   */
  const mobileMenu = (
    <Drawer
      anchor="top"
      open={isMobileMenuOpen}
      onClose={handleMenuToggle}
      sx={{ display: { sm: 'none' } }}
    >
      <List onClick={handleMenuToggle}>
        {sections.map((section) => (
          <ListItem key={section} disablePadding>
            <ListItemButton
              disableRipple
              href={`#${section.toLowerCase()}`}
              sx={{ color: 'secondary.dark' }}
            >
              <ListItemText primary={section} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  // --------------------------------------------------

  return (
    <AppBar
      className="NavBar"
      position="sticky"
      component="nav"
      color="secondary"
      sx={styles}
    >
      <Toolbar sx={{ height: '5em', justifyContent: 'space-between' }}>
        <Logo />
        {menuIconElement}
        {regularMenu}
      </Toolbar>
      {mobileMenu}
    </AppBar>
  );
}

// ==================================================

export default NavBar;

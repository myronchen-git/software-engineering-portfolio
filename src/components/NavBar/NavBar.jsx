import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';

import Logo from './components/Logo';
import NavLink from './components/NavLink';
import about from '/portfolio_info/about.json';

// ==================================================

const sections = ['About', 'Skills', 'Projects'];

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastClickedSection, setLastClickedSection] = useState(null);

  // --------------------------------------------------

  const styles = { '& img.logo': { cursor: 'pointer' } };
  const navLinkCardBoardBoxBackground =
    'url("./background_images/cardboard_box_side.svg") center 90%/25% no-repeat';

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
          'url("./background_images/conveyor_roller_side.svg") ' +
          'bottom/8px repeat-x',
      }}
    >
      {sections.map((section) => (
        <Box
          key={section}
          sx={[
            {
              display: 'inline-block',
              height: '4.5em',
              paddingTop: '1em',
              '&:hover': {
                background: navLinkCardBoardBoxBackground,
              },
            },
            section === lastClickedSection && {
              background: navLinkCardBoardBoxBackground,
            },
          ]}
        >
          <div onClick={() => setLastClickedSection(section)}>
            <NavLink href={`#${section.toLowerCase()}`}>{section}</NavLink>
          </div>
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
              onClick={() => setLastClickedSection(section)}
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
        <div>
          <Grid container columns={3}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ marginRight: '1em' }}
            >
              <Logo />
            </Grid>
            <Grid display="flex" justifyContent="center" alignItems="center">
              <IconButton
                href={about.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                size="large"
                aria-label="redirect"
              >
                <LinkedInIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid display="flex" justifyContent="center" alignItems="center">
              <IconButton
                href={about.githubUrl}
                target="_blank"
                rel="noreferrer"
                size="large"
                aria-label="redirect"
              >
                <GitHubIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        </div>
        {menuIconElement}
        {regularMenu}
      </Toolbar>
      {mobileMenu}
    </AppBar>
  );
}

// ==================================================

export default NavBar;

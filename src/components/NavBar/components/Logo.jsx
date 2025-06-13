import Link from '@mui/material/Link';

import logo from '/src/assets/logo.svg';

// ==================================================

/**
 * Website logo
 */
function Logo() {
  return (
    <Link href="./" sx={{ display: 'flex', padding: '0.25em' }}>
      <img src={logo} className="logo" alt="logo" width="32" />
    </Link>
  );
}

// ==================================================

export default Logo;

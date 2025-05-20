import { GlobalStyles } from '@mui/material';

import About from './components/About/About';
import NavBar from './components/NavBar/NavBar';

import appStyles from './appCss';

// ==================================================

function App() {
  return (
    <>
      <GlobalStyles styles={appStyles} />
      <NavBar />
      <main>
        <About />
      </main>
    </>
  );
}

// ==================================================

export default App;

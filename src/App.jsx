import { GlobalStyles } from '@mui/material';

import About from '/src/components/About/About';
import NavBar from '/src/components/NavBar/NavBar';
import Skills from '/src/components/Skills/Skills';

import appStyles from '/src/appCss';

// ==================================================

function App() {
  return (
    <>
      <GlobalStyles styles={appStyles} />
      <NavBar />
      <main>
        <About />
        <Skills />
      </main>
    </>
  );
}

// ==================================================

export default App;

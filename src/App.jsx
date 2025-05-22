import { GlobalStyles } from '@mui/material';

import About from '/src/components/About/About';
import NavBar from '/src/components/NavBar/NavBar';
import Projects from '/src/components/Projects/Projects';
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
        <Projects />
      </main>
    </>
  );
}

// ==================================================

export default App;

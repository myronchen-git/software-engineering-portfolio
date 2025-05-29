import GlobalStyles from '@mui/material/GlobalStyles';
import { useCallback, useMemo, useState } from 'react';

import { styled } from '@mui/material/styles';
import About from '/src/components/About/About';
import NavBar from '/src/components/NavBar/NavBar';
import ProjectPage from '/src/components/ProjectPage/ProjectPage';
import Projects from '/src/components/Projects/Projects';
import Skills from '/src/components/Skills/Skills';

import { AppContext } from '/src/contexts';

import appStyles from '/src/appCss';

// ==================================================

function App() {
  const [currentProject, setCurrentProject] = useState(null);

  // --------------------------------------------------

  const openProject = useCallback((project) => {
    setCurrentProject(project);
    window.scrollTo(0, 0);
  }, []);

  const closeProject = useCallback(() => {
    setCurrentProject(null);
    window.scrollTo(0, 0);
  }, []);

  // --------------------------------------------------

  const appContextValues = useMemo(
    () => ({ openProject, closeProject }),
    [openProject, closeProject]
  );

  // --------------------------------------------------

  const Main = styled('main')({ flexDirection: 'column' });

  return (
    <>
      <GlobalStyles styles={appStyles} />
      <AppContext.Provider value={appContextValues}>
        {currentProject ? (
          <ProjectPage project={currentProject} />
        ) : (
          <>
            <NavBar />
            <Main className="flex-center">
              <About />
              <Skills />
              <Projects />
            </Main>
          </>
        )}
      </AppContext.Provider>
    </>
  );
}

// ==================================================

export default App;

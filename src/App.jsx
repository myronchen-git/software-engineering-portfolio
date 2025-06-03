import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import { styled } from '@mui/material/styles';
import { useCallback, useMemo, useState } from 'react';

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

  const Main = styled('main')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }));

  return (
    <>
      <GlobalStyles styles={appStyles} />
      <AppContext.Provider value={appContextValues}>
        {currentProject ? (
          <ProjectPage project={currentProject} />
        ) : (
          <>
            <NavBar />
            <Main>
              <Box
                sx={{
                  width: '100%',
                  padding: '5em 0',
                  background:
                    'url("/src/assets/conveyor_roller_top.svg"' +
                    ') center repeat-y',
                }}
              >
                <About />
                <Skills />
                <Projects />
              </Box>
            </Main>
          </>
        )}
      </AppContext.Provider>
    </>
  );
}

// ==================================================

export default App;

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';

import ProjectFirstSection from './components/ProjectFirstSection';
import ProjectImages from './components/ProjectImages';
import ProjectRestOfSections from './components/ProjectRestOfSections';
import ProjectTechStack from './components/ProjectTechStack';
import { headingSizes } from '/src/constants';
import { AppContext } from '/src/contexts';

// ==================================================

function ProjectPage({ project }) {
  const { closeProject } = useContext(AppContext);

  return (
    <Stack
      className="ProjectPage"
      component="main"
      spacing="3em"
      sx={{
        backgroundColor: 'primary.main',
        '& ul': { listStyleType: 'none' },
      }}
    >
      <Button
        variant="contained"
        href="#projects"
        onClick={closeProject}
        color="secondary"
        sx={{
          position: 'fixed',
          top: '1em',
          left: '1em',
        }}
      >
        <ArrowBackIcon /> Back
      </Button>
      <Typography
        component="h1"
        color="secondary.dark"
        sx={{ typography: headingSizes.h1 }}
      >
        {project.projectName}
      </Typography>
      <ProjectImages images={project.imgs.all} />
      <ProjectFirstSection project={project} />
      <div>
        <Divider variant="middle" flexItem />
      </div>
      <ProjectRestOfSections project={project} />
      <div>
        <Divider variant="middle" flexItem />
      </div>
      <ProjectTechStack project={project} />
    </Stack>
  );
}

// ==================================================

export default ProjectPage;

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import parse from 'html-react-parser';
import { useContext } from 'react';

import { AppContext } from '/src/contexts';

// ==================================================

function ProjectPage({ project }) {
  const { closeProject } = useContext(AppContext);

  const sectionStyles = {};

  return (
    <main className="ProjectPage">
      <Button onClick={closeProject}>
        <ArrowBackIcon /> Back
      </Button>
      <h1>{project.projectName}</h1>
      <Box
        className="ProjectPage__images"
        component="section"
        sx={{ '& img': { width: '100%' } }}
      >
        {project.imgs.all.map((img) => (
          <img key={img.alt} src={img.src} alt={img.alt} />
        ))}
      </Box>
      <Box
        className="ProjectPage__first-section"
        component="section"
        sx={{ '& a': { display: 'block' } }}
      >
        {project.links.map((link) => (
          <a key={link} href={link}>
            {link}
          </a>
        ))}
        {parse(project.sections.first)}
      </Box>
      {Object.keys(project.sections)
        .filter((sectionName) => sectionName !== 'first')
        .map((sectionName) => (
          <Box
            key={sectionName}
            className={`ProjectPage__${sectionName}`}
            component="section"
            sx={sectionStyles}
          >
            <h2>{sectionName}</h2>
            {parse(project.sections[sectionName])}
          </Box>
        ))}
    </main>
  );
}

// ==================================================

export default ProjectPage;

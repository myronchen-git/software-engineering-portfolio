import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import ProjectCard from './components/ProjectCard';

// ==================================================

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Dynamically import all JSON files from the folder.  Path argument has to
    // be a string literal and not a template literal or a variable.  Gets the
    // default export from the JSON files, which are JSON Objects.
    const modules = import.meta.glob('/readmes/*.json', { import: 'default' });

    async function loadAllJson() {
      const loadedData = [];

      for (const path in modules) {
        const project = await modules[path](); // Import JSON file.
        loadedData.push(project);
      }

      setProjects(loadedData);
    }

    loadAllJson();
  }, []);

  return (
    <Container id="projects" className="Projects" component="section">
      <Typography variant="h1" component="h1">
        Projects
      </Typography>
      <Grid
        component="ul"
        container
        rowSpacing={4}
        sx={{ listStyleType: 'none' }}
      >
        {projects.map((project) => (
          <Grid
            key={project.projectName}
            className="flex-center"
            component="li"
            size={{ xs: 12, lg: 6 }}
          >
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ==================================================

export default Projects;

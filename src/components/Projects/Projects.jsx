import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import ProjectCard from './components/ProjectCard';
import MainSectionsContainer from '/src/components/_common/MainSectionsContainer';
import MainSectionsHeading1 from '/src/components/_common/MainSectionsHeading1';

// ==================================================

function Projects() {
  const [projects, setProjects] = useState([]);
  const sectionName = 'Projects';

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
    <MainSectionsContainer sectionName={sectionName}>
      <MainSectionsHeading1>{sectionName}</MainSectionsHeading1>
      <Grid
        component="ul"
        container
        spacing={4}
        sx={{ width: '100%', listStyleType: 'none' }}
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
    </MainSectionsContainer>
  );
}

// ==================================================

export default Projects;

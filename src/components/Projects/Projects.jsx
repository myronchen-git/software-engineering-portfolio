import Container from '@mui/material/Container';
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
      <h1>Projects</h1>
      {projects.map((project) => (
        <ProjectCard key={project.projectName} project={project} />
      ))}
    </Container>
  );
}

// ==================================================

export default Projects;

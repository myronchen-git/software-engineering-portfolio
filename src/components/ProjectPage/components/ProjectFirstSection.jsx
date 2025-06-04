import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import parse from 'html-react-parser';

// ==================================================

function ProjectFirstSection({ project }) {
  return (
    <Container className="ProjectPage__ProjectFirstSection" component="section">
      <Box
        className="ProjectPage__ProjectFirstSection__deployed-links"
        sx={{ margin: '1em 0' }}
      >
        {project.links.map((link) => (
          <p key={link}>
            <a href={link}>{link}</a>
          </p>
        ))}
      </Box>
      {parse(project.sections.first)}
    </Container>
  );
}

// ==================================================

export default ProjectFirstSection;

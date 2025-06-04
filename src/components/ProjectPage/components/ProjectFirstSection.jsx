import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import parse from 'html-react-parser';

// ==================================================

function ProjectFirstSection({ project }) {
  return (
    <Box className="ProjectPage__ProjectFirstSection" component="section">
      <Container>
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
    </Box>
  );
}

// ==================================================

export default ProjectFirstSection;

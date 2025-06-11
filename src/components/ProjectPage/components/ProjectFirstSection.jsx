import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import parse from 'html-react-parser';

// ==================================================

function ProjectFirstSection({ project }) {
  const links = [...project.links];

  let githubLink;
  const githubIndex = links.findIndex((link) =>
    link.startsWith('https://github.com')
  );
  if (githubIndex > -1) {
    githubLink = links.splice(githubIndex, 1)[0];
  }

  return (
    <Box className="ProjectPage__ProjectFirstSection" component="section">
      <Container>
        <Box
          className="ProjectPage__ProjectFirstSection__deployed-links"
          sx={{ margin: '1em 0' }}
        >
          {links.map((link) => (
            <p key={link}>
              <a href={link}>{link}</a>
            </p>
          ))}
        </Box>
        <Box className="ProjectPage__ProjectFirstSection__icon-links">
          {githubLink && (
            <IconButton
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              size="large"
              aria-label="redirect"
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
        {parse(project.sections.first)}
      </Container>
    </Box>
  );
}

// ==================================================

export default ProjectFirstSection;

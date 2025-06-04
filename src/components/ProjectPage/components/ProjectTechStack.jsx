import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import H2 from './H2';

// ==================================================

function ProjectTechStack({ project }) {
  const techStackSection = project.sections['Tech Stack'];

  return (
    <Container
      className="ProjectPage__ProjectTechStack"
      component="section"
      sx={{ '& ul': { marginBottom: '2em' } }}
    >
      <H2>Tech Stack</H2>
      <Grid container spacing={2} component="ul">
        {Object.keys(techStackSection).map((subsectionName) => (
          <Grid key={subsectionName} component="li" size={{ xs: 12, sm: 4 }}>
            <h3>{subsectionName}</h3>
            <ul>
              {techStackSection[subsectionName].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ==================================================

export default ProjectTechStack;

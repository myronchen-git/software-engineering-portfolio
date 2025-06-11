import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import H2 from './H2';
import { headingSizes } from '/src/constants';

// ==================================================

function ProjectTechStack({ project }) {
  const techStackSection = project.sections['Tech Stack'];

  return (
    <Box
      className="ProjectPage__ProjectTechStack"
      component="section"
      sx={{ '& ul': { marginBottom: '2em' } }}
    >
      <Container>
        <H2>Tech Stack</H2>
        <Grid container spacing={2} component="ul">
          {Object.keys(techStackSection).map((subsectionName) => (
            <Grid
              key={subsectionName}
              component="li"
              size={{ xs: 12, md: 'grow' }}
            >
              <Typography
                component="h3"
                color="secondary.contrastText"
                sx={{ typography: headingSizes.h3 }}
              >
                {subsectionName}
              </Typography>
              <ul>
                {techStackSection[subsectionName].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ==================================================

export default ProjectTechStack;

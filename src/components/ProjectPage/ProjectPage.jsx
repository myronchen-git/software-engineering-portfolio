import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';
import { useContext } from 'react';

import { AppContext } from '/src/contexts';

// ==================================================

function ProjectPage({ project }) {
  const { closeProject } = useContext(AppContext);

  // --------------------------------------------------

  const HorizontalLine = styled('hr')({
    width: '95%',
  });

  const H2 = styled('h2')({
    textDecorationLine: 'underline',
    textDecorationThickness: '0.1em',
  });

  const sectionStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    '& ul': { listStyleType: 'none' },
  };

  // --------------------------------------------------

  function renderImages() {
    return (
      <Stack
        className="ProjectPage__images"
        component="section"
        spacing="3em"
        sx={{
          '& img': { width: '100%' },
        }}
      >
        {project.imgs.all.map((img) => (
          <img key={img.alt} src={img.src} alt={img.alt + ' image'} />
        ))}
      </Stack>
    );
  }

  function renderFirstSection() {
    return (
      <Container className="ProjectPage__first-section" component="section">
        <Box
          className="ProjectPage__first-section__deployed-links"
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

  function renderTechStack() {
    const techStackSection = project.sections['Tech Stack'];

    return (
      <Container
        className="ProjectPage__TechStack"
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

  function renderRestOfSections() {
    const sections = project.sections;

    const stylesObj = {
      '& ul': { margin: '1em 0' },
      '& li, p': { textAlign: 'start' },
      '& ul > li:not(:last-child)': { marginBottom: '3em' },
      '& ul ul': { marginLeft: '3em' },
    };

    return Object.keys(sections)
      .filter(
        (sectionName) => sectionName !== 'first' && sectionName !== 'Tech Stack'
      )
      .reduce((output, sectionName, currentIndex, filteredSections) => {
        output.push(
          <Container
            key={sectionName}
            className={`ProjectPage__${sectionName}`}
            component="section"
            sx={sectionName === 'Features' ? stylesObj : {}}
          >
            <H2>{sectionName}</H2>
            {parse(sections[sectionName])}
          </Container>
        );

        if (currentIndex !== filteredSections.length - 1)
          output.push(<HorizontalLine key={sectionName + '-hr'} />);

        return output;
      }, []);
  }

  return (
    <Stack
      className="ProjectPage"
      component="main"
      spacing="3em"
      sx={sectionStyles}
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
      <h1>{project.projectName}</h1>
      {renderImages()}
      {renderFirstSection()}
      <HorizontalLine />
      {renderRestOfSections()}
      <HorizontalLine />
      {renderTechStack()}
    </Stack>
  );
}

// ==================================================

export default ProjectPage;

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import parse from 'html-react-parser';

import H2 from './H2';

// ==================================================

function ProjectRestOfSections({ project }) {
  const sections = project.sections;

  const stylesObj = {
    '& ul': { margin: '1em 0' },
    '& li, p': { textAlign: 'start' },
    '& ul > li > p': { fontWeight: 'bold' },
    '& ul > li:not(:last-child)': { marginBottom: '3em' },
    '& ul ul': { marginLeft: '3em' },
  };

  return Object.keys(sections)
    .filter(
      (sectionName) => sectionName !== 'first' && sectionName !== 'Tech Stack'
    )
    .reduce((output, sectionName, currentIndex, filteredSections) => {
      output.push(
        <Box
          key={sectionName}
          className={`ProjectPage__ProjectRestOfSections__${sectionName}`}
          component="section"
          sx={sectionName === 'Features' ? stylesObj : {}}
        >
          <Container>
            <H2>{sectionName}</H2>
            {parse(sections[sectionName])}
          </Container>
        </Box>
      );

      if (currentIndex !== filteredSections.length - 1)
        output.push(
          <div key={sectionName + '-hr'}>
            <Divider variant="middle" flexItem />
          </div>
        );

      return output;
    }, []);
}

// ==================================================

export default ProjectRestOfSections;

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

// ==================================================

function MainSectionsContainer({ sectionName, children }) {
  return (
    <Container
      id={sectionName.toLowerCase()}
      className={sectionName}
      component="section"
      disableGutters
      sx={{ margin: '5em auto' }}
    >
      <Stack sx={{ alignItems: 'center', '& > *': { margin: '2em 0' } }}>
        {children}
      </Stack>
    </Container>
  );
}

// ==================================================

export default MainSectionsContainer;

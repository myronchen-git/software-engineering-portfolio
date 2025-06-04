import Stack from '@mui/material/Stack';

// ==================================================

function ProjectImages({ images }) {
  return (
    <Stack
      className="ProjectPage__ProjectImages"
      component="section"
      spacing="3em"
      sx={{
        '& img': { width: '100%' },
      }}
    >
      {images.map((img) => (
        <img key={img.alt} src={img.src} alt={img.alt + ' image'} />
      ))}
    </Stack>
  );
}

// ==================================================

export default ProjectImages;

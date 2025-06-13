import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

import { importProjectImage } from '/src/util/projectImageImporter';

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
        <ProjectImage key={img.alt} img={img} />
      ))}
    </Stack>
  );
}

function ProjectImage({ img }) {
  const [projectImage, setProjectImage] = useState(null);

  useEffect(() => {
    importProjectImage('/' + img.src).then((image) => setProjectImage(image));
  }, [img.src]);

  return <img key={img.alt} src={projectImage} alt={img.alt + ' image'} />;
}

// ==================================================

export default ProjectImages;

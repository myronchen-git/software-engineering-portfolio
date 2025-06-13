import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import parse from 'html-react-parser';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '/src/contexts';
import { importProjectImage } from '/src/util/projectImageImporter';

// ==================================================

function ProjectCard({ project }) {
  const { openProject } = useContext(AppContext);
  const [projectImage, setProjectImage] = useState(null);

  useEffect(() => {
    if (project?.imgs?.primary?.src) {
      importProjectImage('/' + project.imgs.primary.src).then((image) =>
        setProjectImage(image)
      );
    }
  }, [project]);

  return (
    <Box
      className="ProjectCard flex-center"
      sx={{
        background:
          'url("./background_images/cardboard_box_top.svg") center no-repeat',
        backgroundSize: 'auto 30em',
        height: '30em',
        width: '30em',
      }}
    >
      <Card
        component="article"
        sx={{
          maxWidth: '15em',
          border: '0.25em solid black',
          borderRadius: '1em',
          boxShadow: '0 0 0.75em black',
          backgroundColor: 'primary.main',
          '&:hover, :active': { transform: 'scale(1.1)' },
        }}
      >
        <CardActionArea
          sx={{ minHeight: '17em' }}
          onClick={() => openProject(project)}
        >
          {project?.imgs?.primary ? (
            <CardMedia
              component="img"
              alt={`${project.projectName} image`}
              image={projectImage}
              sx={{
                height: '10em',
                objectPosition: 'top',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          ) : (
            ''
          )}
          <CardContent>
            <h4>{project.projectName}</h4>
            {parse(project.sections.first)}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

// ==================================================

export default ProjectCard;

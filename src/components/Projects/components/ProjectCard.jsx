import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import parse from 'html-react-parser';
import { useContext } from 'react';

import { AppContext } from '/src/contexts';

// ==================================================

function ProjectCard({ project }) {
  const { openProject } = useContext(AppContext);

  return (
    <Box
      className="ProjectCard flex-center"
      sx={{
        background: 'url("/src/assets/cardboard_box_top.svg") center no-repeat',
        backgroundSize: 'auto 30em',
        height: '30em',
        width: '30em',
      }}
    >
      <Card
        component="article"
        sx={{
          width: '15em',
          border: '0.25em solid black',
          borderRadius: '1em',
          boxShadow: '0 0 0.75em black',
          backgroundColor: 'primary.main',
        }}
      >
        <CardActionArea onClick={() => openProject(project)}>
          <CardMedia
            component="img"
            alt={`${project.projectName} image`}
            image={project.imgs.primary.src}
            sx={{ height: '10em', objectPosition: 'top' }}
          />
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

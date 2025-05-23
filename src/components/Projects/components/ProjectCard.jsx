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
    <Card>
      <CardActionArea onClick={() => openProject(project)}>
        <CardMedia
          component="img"
          alt={`${project.projectName} image`}
          image={project.imgs.primary.src}
          sx={{ height: '10em', width: '14em', objectPosition: 'top' }}
        />
        <CardContent>
          <h4>{project.projectName}</h4>
          {parse(project.sections.first)}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// ==================================================

export default ProjectCard;

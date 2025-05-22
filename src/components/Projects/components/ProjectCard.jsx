import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import parse from 'html-react-parser';

// ==================================================

function ProjectCard({ project }) {
  return (
    <Card>
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
    </Card>
  );
}

// ==================================================

export default ProjectCard;

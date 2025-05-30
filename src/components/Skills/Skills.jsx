import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SkillCategory from './components/SkillCategory';
import skills from '/portfolio_info/skills.json';

// ==================================================

function Skills() {
  return (
    <Container id="skills" className="Skills" component="section">
      <Typography variant="h1" component="h1">
        Skills
      </Typography>
      <Box component="ul" sx={{ listStyleType: 'none' }}>
        {Object.entries(skills).map(([category, names]) => (
          <Box key={category} component="li">
            <SkillCategory category={category} names={names} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

// ==================================================

export default Skills;

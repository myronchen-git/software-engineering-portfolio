import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import SkillCategory from './components/SkillCategory';
import skills from '/portfolio_info/skills.json';

// ==================================================

function Skills() {
  return (
    <Container id="skills" className="Skills" component="section">
      <h1>Skills</h1>
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

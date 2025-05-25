import Box from '@mui/material/Box';

import SkillCategory from './components/SkillCategory';
import skills from '/portfolio_info/skills.json';

// ==================================================

function Skills() {
  return (
    <Box id="skills" className="Skills" component="section">
      <h1>Skills</h1>
      <Box component="ul">
        {Object.entries(skills).map(([category, names]) => (
          <Box key={category} component="li">
            <SkillCategory category={category} names={names} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ==================================================

export default Skills;

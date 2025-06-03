import Box from '@mui/material/Box';

import SkillCategory from './components/SkillCategory';
import skills from '/portfolio_info/skills.json';
import MainSectionsContainer from '/src/components/_common/MainSectionsContainer';
import MainSectionsHeading1 from '/src/components/_common/MainSectionsHeading1';

// ==================================================

function Skills() {
  const sectionName = 'Skills';

  return (
    <MainSectionsContainer sectionName={sectionName}>
      <MainSectionsHeading1>{sectionName}</MainSectionsHeading1>
      <Box component="ul" sx={{ width: '100%', listStyleType: 'none' }}>
        {Object.entries(skills).map(([category, names]) => (
          <Box key={category} component="li">
            <SkillCategory category={category} names={names} />
          </Box>
        ))}
      </Box>
    </MainSectionsContainer>
  );
}

// ==================================================

export default Skills;

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import SkillCard from './SkillCard';

// ==================================================

function SkillCategory({ category, names }) {
  const Article = styled('article')({
    padding: '2em',
    flexDirection: 'column',
    '& ul': { listStyleType: 'none' },
  });

  return (
    <Article className="SkillCategory flex-center">
      <h2>{category}</h2>
      <Box
        className="flex-center"
        sx={{
          background:
            'url("/src/assets/cardboard_box_top.svg") center no-repeat',
          backgroundSize: 'auto 60em',
          height: '60em',
          width: '100%',
        }}
      >
        <Grid
          component="ul"
          container
          spacing={1}
          sx={{
            height: '30em',
            width: '30em',
            padding: '2em',
            justifyContent: 'space-between',
            alignContent: 'space-around',
            alignItems: 'space-between',
          }}
        >
          {names.map((name) => (
            <Grid key={name} component="li">
              <SkillCard name={name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Article>
  );
}

// ==================================================

export default SkillCategory;

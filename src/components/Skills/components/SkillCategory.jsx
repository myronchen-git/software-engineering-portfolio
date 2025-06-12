import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import SkillCard from './SkillCard';
import MainSectionsHeading2 from '/src/components/_common/MainSectionsHeading2';

// ==================================================

function SkillCategory({ category, names }) {
  const Article = styled('article')({
    margin: '4em 0',
    flexDirection: 'column',
    '& > *:not(:last-child)': { marginBottom: '2em' },
    '& ul': { listStyleType: 'none' },
  });

  return (
    <Article className="SkillCategory flex-center">
      <MainSectionsHeading2>{category}</MainSectionsHeading2>
      <Box
        className="flex-center"
        sx={{
          background:
            'url("/background_images/cardboard_box_top.svg") center no-repeat',
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
            justifyContent: 'space-around',
            justifyItems: 'center',
            alignContent: 'space-around',
            alignItems: 'center',
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

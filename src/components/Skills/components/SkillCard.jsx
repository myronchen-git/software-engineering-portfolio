import { Box } from '@mui/material';

// ==================================================

const pathToIcons = '/portfolio_info/icons';

function SkillCard({ name }) {
  return (
    <Box
      sx={{
        height: '7em',
        width: '6em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ height: '3em', width: '3em' }}>
        <img src={`${pathToIcons}/${name}.svg`} alt={`${name} icon`} />
      </Box>
      {name}
    </Box>
  );
}

// ==================================================

export default SkillCard;

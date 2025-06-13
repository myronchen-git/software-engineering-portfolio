import Box from '@mui/material/Box';

// ==================================================

function SkillCard({ name }) {
  return (
    <Box
      className="SkillCard flex-center"
      sx={{
        height: '7.5em',
        width: '6.5em',
        flexDirection: 'column',
        border: '0.25em solid black',
        borderRadius: '1em',
        boxShadow: '0 0 0.5em black',
        backgroundColor: 'primary.main',
      }}
    >
      <Box sx={{ height: '3em', width: '3em' }}>
        <img src={`./brand_icons/${name}.svg`} alt={`${name} icon`} />
      </Box>
      {name}
    </Box>
  );
}

// ==================================================

export default SkillCard;

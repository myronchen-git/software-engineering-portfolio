import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';

import file from '/portfolio_info/about.txt';

// ==================================================

function About() {
  const [text, setText] = useState(null);

  useEffect(() => {
    fetch(file).then((raw) => setText(raw.text()));
  }, []);

  return (
    <Container
      id="about"
      className="About flex-center"
      component="section"
      sx={{
        flexDirection: 'column',
      }}
    >
      <h1>About</h1>
      <Box
        className="flex-center"
        sx={{
          background: 'url("/src/assets/cardboard_box.svg") center no-repeat',
          backgroundSize: 'auto 60em',
          height: '60em',
          width: '100%',
        }}
      >
        <Box
          className="flex-center"
          component="article"
          sx={{
            height: '30em',
            width: '30em',
            padding: '2em',
            border: '0.5em solid black',
            borderRadius: '2em',
            boxShadow: '0 0 1.5em black',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <p>{text}</p>
        </Box>
      </Box>
    </Container>
  );
}

// ==================================================

export default About;

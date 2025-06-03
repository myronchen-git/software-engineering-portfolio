import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

import file from '/portfolio_info/about.txt';
import MainSectionsContainer from '/src/components/_common/MainSectionsContainer';
import MainSectionsHeading1 from '/src/components/_common/MainSectionsHeading1';

// ==================================================

function About() {
  const [text, setText] = useState(null);
  const sectionName = 'About';

  useEffect(() => {
    fetch(file).then((raw) => setText(raw.text()));
  }, []);

  return (
    <MainSectionsContainer sectionName={sectionName}>
      <MainSectionsHeading1>{sectionName}</MainSectionsHeading1>
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
            backgroundColor: 'primary.main',
          }}
        >
          <p>{text}</p>
        </Box>
      </Box>
    </MainSectionsContainer>
  );
}

// ==================================================

export default About;

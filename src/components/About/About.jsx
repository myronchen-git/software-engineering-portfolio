import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
            'url("./background_images/cardboard_box_top.svg") center no-repeat',
          backgroundSize: 'auto 60em',
          height: '60em',
          width: '100%',
        }}
      >
        <Card
          className="flex-center"
          component="article"
          sx={{
            minHeight: '30em',
            maxWidth: '30em',
            padding: '2em',
            border: '0.5em solid black',
            borderRadius: '2em',
            boxShadow: '0 0 1.5em black',
            backgroundColor: 'primary.main',
          }}
        >
          <CardContent>
            <Typography variant="body1">{text}</Typography>
          </CardContent>
        </Card>
      </Box>
    </MainSectionsContainer>
  );
}

// ==================================================

export default About;

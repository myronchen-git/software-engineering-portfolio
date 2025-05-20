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
    <Container id="about" className="About" component="section">
      <h1>About</h1>
      <p>{text}</p>
    </Container>
  );
}

// ==================================================

export default About;

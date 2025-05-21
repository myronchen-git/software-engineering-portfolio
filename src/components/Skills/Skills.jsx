import Container from '@mui/material/Container';

import SkillCard from './components/SkillCard';
import skills from '/portfolio_info/skills.json';

// ==================================================

function Skills() {
  return (
    <Container id="skills" className="Skills" component="section">
      <h1>Skills</h1>
      {Object.entries(skills).map(([category, names]) => (
        <article key={category}>
          <h2>{category}</h2>
          <ul>
            {names.map((name) => (
              <li key={name}>
                <SkillCard name={name} />
              </li>
            ))}
          </ul>
        </article>
      ))}
    </Container>
  );
}

// ==================================================

export default Skills;

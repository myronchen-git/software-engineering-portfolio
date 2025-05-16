'use strict';

import markdownit from 'markdown-it';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';

// ==================================================

const md = markdownit('commonmark');
const repositoriesPath = './repositories';
const readmeDataPath = './readmes';

// --------------------------------------------------

function loadReadmes() {
  const repositoryNames = readdirSync(repositoriesPath);

  // for each folder in repositories
  for (const repositoryName of repositoryNames) {
    const filePath = `${repositoriesPath}/${repositoryName}/README.md`;
    const readme = parseReadme(filePath);
    storeReadmeData(repositoryName, readme);
  }
}

/*
async function parseReadme(dir) {
  const file = await open(dir);

  const readme = {};
  let currentSection = null;
  let currentSectionProcess = null;
  let data = null;

  for await (const line of file.readLines()) {
    if (line.startsWith('## ') && currentSection) {
      readme[currentSection] = data;
      // data = null;
      // currentSection = null;

      if (currentSection === 'Tech Stack') break;
    }

    if (line.startsWith('# ')) {
      data = '';
      currentSection = 'first';
    } else if (line.startsWith('## Overview')) {
      data = [];
      currentSection = 'Overview';
      currentSectionProcess = processOverview();
    } else if (line.startsWith('## Features')) {
      data = '';
      currentSection = 'Features';
    } else if (line.startsWith('## Tech Stack')) {
      data = '';
      currentSection = 'Tech Stack';
    } else {
      // if (line) {
      //   str += (line.endsWith('  ') ? line.trimEnd() : line) + ' ';
      // } else {
      //   str += '\n';
      // }

      data = currentSectionProcess(line, data);
    }
  }

  file.close();

  return readme;

  function processOverview() {
    let str = '';

    return (line, data) => {
      if (line) {
        str += line + ' ';
      } else if (str) {
        data.push(str);
        str = '';
      }

      return data;
    };
  }
}
*/

/*
function parseReadme(path) {
  const text = readFileSync(path, 'utf8');
  const tokens = md.parse(text, {});

  const result = [];
  let currentItem = null;

  tokens.forEach((token) => {
    if (token.type === 'heading_open' && token.markup === '##') {
      currentItem = { title: '', description: '' };
    }

    ////
    if (token.type === 'list_item_open') {
      // Start of a new list item
      currentItem = { title: '', description: '' };
    } else if (token.type === 'inline') {
      if (!currentItem.title) {
        // First inline inside list item: assume it's the title
        currentItem.title = token.content.trim();
      } else {
        // Subsequent inline tokens are the description
        currentItem.description +=
          (currentItem.description ? ' ' : '') + token.content.trim();
      }
    } else if (token.type === 'list_item_close') {
      if (currentItem) {
        result.push(currentItem);
        currentItem = null;
      }
    }
      ////
  });

  return result;
}
*/

/**
 * Parses a README for specific sections and puts their text, images, and other
 * metadata into an Object.  Current sections are the first section (brief
 * overview), Overview, Features, and Tech Stack.  Also includes locations of
 * images relative to the README.
 *
 * @param {String} filePath - Relative path from the root of this project to the
 *  README.md file.
 * @returns {Object} An Object with properties "first", "Overview", "Features",
 *  "Tech Stack", and "imgs"; which are select representations of a README.
 */
function parseReadme(filePath) {
  const fileText = readFileSync(filePath, 'utf8');
  const htmlArray = md.render(fileText).split('\n');

  let readme = {};
  let currentSection = null;
  let sectionText = '';

  for (const line of htmlArray) {
    if (line.startsWith('<h2>') && currentSection) {
      readme[currentSection] = sectionText;
      sectionText = '';

      if (currentSection === 'Tech Stack') break;
      currentSection = null;
    }

    if (line.startsWith('<h1>')) {
      readme.projectName = line.match(/<h1>(.*?)<\/h1>/)[1];
      currentSection = 'first';
    } else if (line === '<h2>Overview</h2>') {
      currentSection = 'Overview';
    } else if (line === '<h2>Features</h2>') {
      currentSection = 'Features';
    } else if (line === '<h2>Tech Stack</h2>') {
      currentSection = 'Tech Stack';
    } else {
      if (currentSection) {
        sectionText += line.endsWith('>') ? line : line + ' ';
      }
    }
  }

  const readmeParts = parseFirstSection(readme);
  readme = { ...readme, ...readmeParts };

  return readme;
}

/**
 * Further parses a README's first section's data, so that it can more easily be
 * processed by React components.  This removes the <img> tags and only keeps
 * <p> tag content in the "first" property of the readme Object.  The <img>
 * tags are broken up and placed into their own property in the readme Object.
 *
 * @param {Object} readme - The initial, unfinished readme data after parsing
 *  a README.
 * @returns {
 *  {
 *    first: String,
 *    imgs: { src: String, alt: String }[]
 *  }
 * } An Object that contains the final version of the first section and <img>
 *  tag src and alt attributes.
 */
function parseFirstSection(readme) {
  const newReadmeProperties = {};

  newReadmeProperties.imgs = getImgs(readme.first);
  newReadmeProperties.first = cleanFirstSection(readme.first);

  return newReadmeProperties;
}

/**
 * Finds <img> tags in a String and extracts the src and alt attributes for
 * each.  The String is supposed to be a README's first section in HTML form.
 *
 * @param {String} text - A README's first section's raw HTML text.
 * @returns {
 *  { src: String, alt: String }[]
 * } A list of image data containing src and alt attributes.
 */
function getImgs(text) {
  const imgs = [];
  const matches = text.matchAll(/<img[^>]+>/g);

  for (const match of matches) {
    const imgString = match[0];
    const img = {};

    const srcMatches = imgString.match(/src="([^"]+)"/);
    img.src = srcMatches[1];

    const altMatches = imgString.match(/alt="([^"]+)"/);
    img.alt = altMatches[1];

    imgs.push(img);
  }

  return imgs;
}

/**
 * Selects only the <p> tag content from a String.  The String is supposed to be
 * a README's first section in HTML form.
 *
 * @param {String} text - A README's first section's raw HTML text.
 * @returns {String} A String containing only <p> tags and their content.
 */
function cleanFirstSection(text) {
  const matches = text.matchAll(/<p>.*?<\/p>/g);

  let str = '';
  for (const match of matches) {
    str += match[0];
  }

  return str;
}

/**
 * Saves the README data into JSON files.
 *
 * @param {String} repositoryName - Name of the repository containing the
 *  README.
 * @param {Object} readme - The README data.
 */
function storeReadmeData(repositoryName, readme) {
  if (!existsSync(readmeDataPath)) mkdirSync(readmeDataPath);

  writeFileSync(
    `${readmeDataPath}/${repositoryName}.json`,
    JSON.stringify(readme, null, 2)
  );
}

// ==================================================

loadReadmes();

// ==================================================

export { parseReadme };

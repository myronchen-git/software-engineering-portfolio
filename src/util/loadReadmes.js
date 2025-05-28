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
const repositoriesPath = 'repositories';
const readmeDataPath = 'readmes';

// --------------------------------------------------

function loadReadmes() {
  const repositoryNames = readdirSync(repositoriesPath);

  // for each folder in repositories
  for (const repositoryName of repositoryNames) {
    const filePath = `${repositoriesPath}/${repositoryName}/README.md`;
    const readme = parseReadme(filePath, repositoryName);
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
 * images relative to the project root and links.
 *
 * @param {String} filePath - Relative path from the root of this project to the
 *  README.md file.
 * @param {String} repositoryName - Name of the repository.
 * @returns {Object} An Object containing data from a README, such as the first
 *  section, Overview, Features, Tech Stack, and images.
 */
function parseReadme(filePath, repositoryName) {
  const fileText = readFileSync(filePath, 'utf8');
  const htmlArray = md.render(fileText).split('\n');

  const sections = {};
  let projectName = null;
  let currentSection = null;
  let sectionText = '';

  for (const line of htmlArray) {
    if (line.startsWith('<h2>') && currentSection) {
      sections[currentSection] = sectionText;
      sectionText = '';

      if (currentSection === 'Tech Stack') break;
      currentSection = null;
    }

    if (line.startsWith('<h1>')) {
      projectName = line.match(/<h1>(.*?)<\/h1>/)[1];
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

  const readmeFirstSectionParts = parseFirstSection(sections.first);
  const imgs = getImgs();

  sections.first = readmeFirstSectionParts.first;
  return { projectName, sections, links: readmeFirstSectionParts.links, imgs };

  /**
   * Further parses a README's first section's data, so that it can more easily
   * be processed by React components.  This only keeps <p> tag content in the
   * "first" property of the readme Object, as well as extracts all of links in
   * it.
   *
   * @param {String} text - The initial, raw first section text after parsing
   *  a README.
   * @returns {{ first: String, links: String[] }} An Object that contains the
   *  final version of the first section and any found links in it.
   */
  function parseFirstSection(text) {
    const newReadmeProperties = {};

    const links = [];
    let str = '';

    const matches = text.matchAll(/<p>.*?<\/p>/g);

    for (const match of matches) {
      if (match[0].includes('http')) {
        const httpLink = match[0].slice(3, -4);
        links.push(httpLink);
      } else {
        str += match[0];
      }
    }

    newReadmeProperties.first = str;
    newReadmeProperties.links = links;

    return newReadmeProperties;
  }

  /**
   * Gets data from the indexImages.json file from within readme_files and
   * changes the src path to be from the project root.
   *
   * @returns {Promise<{
   *  primary: { src: String, alt: String },
   *  all: { src: String, alt: String }[]
   *  }>} A list of image data containing src and alt attributes.  src path is
   *  relative to project root.  The primary key is for the primary image that
   *  will be used to represent the project.  The all key is for all images that
   *  will be used to describe the project, in order of presentation.
   */
  function getImgs() {
    const pathToDir = `${repositoriesPath}/${repositoryName}/readme_files/`;

    const imgs = JSON.parse(readFileSync(pathToDir + 'indexImages.json'));

    imgs.primary.src = pathToDir + imgs.primary.src;
    imgs.all.forEach((img) => {
      img.src = pathToDir + img.src;
    });

    return imgs;
  }
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

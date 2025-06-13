'use strict';

import { Buffer } from 'node:buffer';
import { mkdirSync, writeFileSync } from 'node:fs';

import about from '#portfolio_info/about.json' with { type: 'json' };

// ==================================================

const owner = about.gitHubUsername;
const topicToGet = 'showcase';
const baseDestinationPath = './repositories';

// --------------------------------------------------

async function downloadGithubRepos() {
  const selectedRepos = await getSelectedRepos(topicToGet);

  // Create repositories directory.
  try {
    mkdirSync(baseDestinationPath);
  } catch (err) {
    console.warn(err.message);
  }

  await retrieveReadmes(selectedRepos);
  await retrieveReadmeFilesDir(selectedRepos);
}

async function getSelectedRepos(topicToGet) {
  // Get all repos.
  const reposResponse = await fetch(
    `https://api.github.com/users/${owner}/repos`
  );
  if (!reposResponse.ok) {
    throw new Error(`Failed to retrieve all repos for ${owner}.`, {
      cause: reposResponse.statusText,
    });
  }
  const repos = await reposResponse.json();

  // Select repos.
  return repos.reduce((repoList, repo) => {
    if (repo.visibility === 'public' && repo.topics.includes(topicToGet)) {
      repoList.push({
        name: repo.name,
        full_name: repo.full_name,
        owner: repo.owner.login,
        created_at: repo.created_at,
      });
    }

    return repoList;
  }, []);
}

async function retrieveReadmes(selectedRepos) {
  // Create promises to fetch readmes.
  const readmeFetches = selectedRepos.map((repo) =>
    fetch(`https://api.github.com/repos/${repo.full_name}/readme`, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  );

  // Await fetching of README texts.
  const readmeResults = await Promise.allSettled(
    (await Promise.allSettled(readmeFetches))
      .filter((result) => result.status === 'fulfilled' && result.value.ok)
      .map((result) => result.value.text())
  );

  // Create files and directories.
  for (const [i, readmeResult] of readmeResults.entries()) {
    // Checking if failed.
    if (readmeResult.status === 'rejected') {
      console.error(
        `Failed to get README for ${selectedRepos[i].full_name}.` +
          `\n${readmeResult.reason}`
      );
      continue;
    }

    const repoPath = `${baseDestinationPath}/${selectedRepos[i].name}`;

    // Create directory.
    try {
      mkdirSync(repoPath);
    } catch (err) {
      if (err.code === 'EEXIST') {
        console.warn(err.message);
      } else {
        throw err;
      }
    }

    // Create readme file.
    try {
      writeFileSync(`${repoPath}/README.md`, readmeResult.value);
      writeFileSync(
        `${repoPath}/metadata.json`,
        JSON.stringify({
          created_at: selectedRepos[i].created_at,
        })
      );
    } catch (err) {
      console.warn(err.message);
    }
  }
}

async function retrieveReadmeFilesDir(selectedRepos) {
  // Create promises to fetch readme files directory.
  const readmeFilesFetches = selectedRepos.map((repo) =>
    fetch(
      `https://api.github.com/repos/${repo.full_name}/contents/readme_files`,
      {
        headers: {
          Accept: 'application/vnd.github.raw+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )
  );

  // Await fetching of README files.
  const readmeFilesResults = await Promise.allSettled(
    (
      await Promise.allSettled(readmeFilesFetches)
    ).map((result, i) => {
      if (result.status === 'fulfilled' && result.value.ok) {
        return result.value.json();
      } else {
        console.warn(
          `Failed to get README files directory for ` +
            `${selectedRepos[i].full_name}`
        );
        return null;
      }
    })
  );

  // Create files and directories.
  for (const [i, readmeFilesResult] of readmeFilesResults.entries()) {
    // If request failed from earlier.
    if (readmeFilesResult.value === null) continue;

    // Checking if getting the JSON failed.
    if (readmeFilesResult.status === 'rejected') {
      console.error(
        `Failed to get readme_files contents for ${selectedRepos[i].full_name}.` +
          `\n${readmeFilesResult.reason}`
      );
      continue;
    }

    const repoPath = `${baseDestinationPath}/${selectedRepos[i].name}`;
    const readmeFilesPath = `${repoPath}/readme_files`;

    // Create directory.
    try {
      mkdirSync(repoPath);
    } catch (err) {
      if (err.code === 'EEXIST') {
        console.warn(err.message);
      } else {
        throw err;
      }
    }

    // Create readme_files directory.
    try {
      mkdirSync(readmeFilesPath);
    } catch (err) {
      if (err.code === 'EEXIST') {
        console.warn(err.message);
      } else {
        throw err;
      }
    }

    for (const fileMetadata of readmeFilesResult.value) {
      // Fetch file.
      const fileContentsResponse = await fetch(fileMetadata.download_url);

      // Writing file.
      if (fileContentsResponse.ok) {
        try {
          const fileBuffer = Buffer.from(
            await fileContentsResponse.arrayBuffer()
          );
          writeFileSync(`${readmeFilesPath}/${fileMetadata.name}`, fileBuffer);
        } catch (err) {
          console.error(`Failed to write file ${fileMetadata.name}.\n${err}`);
        }
      } else {
        console.error(`Failed to download file ${fileMetadata.name}.`);
      }
    }
  }
}

// ==================================================

downloadGithubRepos();

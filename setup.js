const {exec} = require('child_process');
const core = require('@actions/core');

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({stdout, stderr});
      }
    });
  });
}

/**
 * Get the repository owner from the repository string.
 * @param {string} repository
 * @return {string} The owner of the repository.
 */
function getRepositoryOwner(repository) {
  return repository ? repository.split('/')[0] : null;
}

async function gitup(token) {
  await sh(`git config user.name GitHub Action`)
  await sh(`git config user.email github-action@users.noreply.github.com`)
  await sh(`git config url."https://${token}:x-oauth-basic@github.com/".insteadOf "https://github.com/"`);
}

function envup() {
  const owner = getRepositoryOwner(process.env.GITHUB_REPOSITORY);
  core.exportVariable('GOPRIVATE', `github.com/${owner}/*`);
}

module.exports = {gitup, envup};

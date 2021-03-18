const core = require('@actions/core');
const {gitup} = require('./setup');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('token');

    core.info(`Setup env ...`);
    await envup();

    // setup git
    core.info(`Setup git ...`);
    await gitup(token);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

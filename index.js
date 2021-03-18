const core = require('@actions/core');
const {gitup, envup} = require('./setup');

// most @actions toolkit packages have async methods
async function run() {
  try {
    // get input
    const token = core.getInput('token');

    // setup env
    core.info(`Setup env ...`);
    envup();

    // setup git
    core.info(`Setup git ...`);
    await gitup(token);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

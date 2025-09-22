const core = require('@actions/core');
const { extOperaUpload, OperaUploadAction } = require('ext-opera-upload');

async function main() {
  try {
    const options = {
      packageId: core.getInput('package-id'),
      email: core.getInput('email'),
      password: core.getInput('password'),
      packagePath: core.getInput('package-path'),
      action: core.getInput('action'),
    };
    if (![OperaUploadAction.UPLOAD, OperaUploadAction.PUBLISH, OperaUploadAction.VERIFY].includes(options.action)) {
      throw new Error('Invalid action, must be one of: publish, verify, upload');
    }
    await extOperaUpload(options);
  } catch (e) {
    core.setFailed(e.message);
  }
}

void main();

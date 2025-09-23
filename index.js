require('dotenv').config();
const { extOperaUpload } = require('ext-opera-upload');

async function main() {
  try {
    const options = {
      packageId: process.env.OPERA_ADDON_PACKAGE_ID,
      email: process.env.OPERA_ADDON_EMAIL,
      password: process.env.OPERA_ADDON_PASSWORD,
      packagePath: process.env.OPERA_ADDON_PACKAGE_PATH,
      action: process.env.OPERA_ADDON_ACTION,
    };
    console.log('action: ', options.action);
    await extOperaUpload(options);
  } catch (e) {
    console.error(e.message);
  }
}

void main();

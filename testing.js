/* eslint-disable strict, jest/no-jest-import */

'use strict';

process.env.NODE_ENV = 'test';

const jest = require('jest');

const createJestConfig = require('./config/jest.config');

// Get the options that may be passed on the script invocation.
// E.g: node ./.dev-tools/scripts/test.js --env=jsdom
const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (
  !process.env.CI &&
  argv.indexOf('--coverage') < 0 &&
  argv.indexOf('--ci') < 0
) {
  argv.push('--watch');
}

argv.push('--config', JSON.stringify(createJestConfig));

jest.run(argv).then(() => {
  // Used for finish the process on coverage
  process.exit(0);
});

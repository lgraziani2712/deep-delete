/* eslint-disable strict */

'use strict';

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  // FIXME
  // eslint-disable-next-line import/no-unresolved
} = require('worker_threads');

if (!isMainThread) {
  parentPort.postMessage(require('./commonjs').apply(null, workerData));

  process.exit(0);
}

/**
 * Removes every matched key recursively.
 *
 * @param {string|Array<string>} filters The key(s) to delete.
 * @param {Object|Array} data The data to be processed.
 * @returns {Object|Array} The cleaned data.
 */
module.exports = function deepDeleteWithWT(filters, data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: [filters, data],
    });

    worker.on('message', resolve);
    worker.on('error', reject);
  });
};

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
  parentPort.postMessage({
    response: require('.').call(null, workerData),
  });

  return;
}

/**
 * Removes every matched key recursively.
 *
 * @param {string|Array<string>} filters The key(s) to delete.
 * @param {any} data The data to be processed.
 * @returns {any} The cleaned data.
 */
module.exports = function deepDeleteWithWT(filters, data) {
  const hasMultipleFilters = Array.isArray(filters);

  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: [filters, data, hasMultipleFilters],
    });

    worker.on('exit', code => {
      if (code !== 0) {
        reject(`Worker thread finished with error code: ${code}`);
      } else {
        resolve(workerData);
      }
    });
  });
};

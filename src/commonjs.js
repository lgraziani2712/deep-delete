/* eslint-disable strict */

'use strict';

/**
 * Removes every matched key recursively.
 *
 * @param {string|Array<string>} filters The key(s) to delete.
 * @param {Object|Array} data The data to be processed.
 * @returns {Object|Array} The cleaned data.
 */
module.exports = function deepDelete(filters, data) {
  const processElement = element =>
    element != null &&
    !(element instanceof Date) &&
    (Array.isArray(element) || typeof element === 'object')
      ? deepDelete(filters, element)
      : element;

  if (Array.isArray(data)) {
    return data.map(processElement);
  }
  const hasMultipleFilters = Array.isArray(filters);

  return Object.keys(data).reduce((partial, key) => {
    if (hasMultipleFilters ? filters.includes(key) : key === filters) {
      return partial;
    }

    partial[key] = processElement(data[key]);

    return partial;
  }, {});
};

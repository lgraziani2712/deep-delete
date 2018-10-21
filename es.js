/**
 * Removes every matched key recursively.
 *
 * @param {string|Array<string>} filters The key(s) to delete.
 * @param {any} data The data to be processed.
 * @returns {any} The cleaned data.
 */
export default function deepDelete(filters, data) {
  if (Array.isArray(data)) {
    return data.map(element => deepDelete(filters, element));
  }
  if (!data || typeof data !== 'object') {
    return data;
  }
  const hasMultipleFilters = Array.isArray(filters);

  return Object.keys(data).reduce((partial, key) => {
    if (hasMultipleFilters ? filters.includes(key) : key === filters) {
      return partial;
    }
    partial[key] = deepDelete(filters, data[key]);

    return partial;
  }, {});
}

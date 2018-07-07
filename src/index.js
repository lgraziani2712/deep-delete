/**
 * Removes every matched key recursively.
 *
 * @param {string} keyToSearch The key to delete.
 * @param {any} data The data to be processed.
 * @returns {any} The cleaned data.
 */
export default function deepDelete(keyToSearch, data) {
  if (Array.isArray(data)) {
    return data.map(element => deepDelete(keyToSearch, element));
  }
  if (!data || typeof data !== 'object') {
    return data;
  }

  return Object.keys(data).reduce((partial, key) => {
    if (key === keyToSearch) {
      return partial;
    }
    partial[key] = deepDelete(keyToSearch, data[key]);

    return partial;
  }, {});
}

/* eslint-disable strict */

'use strict';

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__benchmarks__/',
    '/__tests__/',
    '<rootDir>/deoptigate/',
    '<rootDir>/coverage/',
    '<rootDir>/testing.js',
    '.eslintrc.js',
    // FIXME Work with ES6 modules
    '<rootDir>/src/es.js',
  ],
  testEnvironment: 'node',
};

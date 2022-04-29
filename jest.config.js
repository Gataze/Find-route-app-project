/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
  },

  transformIgnorePatterns: [ 
    "node_modules/(?!@here/maps-api-for-javascript)"
  ]
};
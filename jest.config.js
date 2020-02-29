module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/main.ts',
    '!src/registerServiceWorker.ts',
    '!**/node_modules/**'
  ]
}

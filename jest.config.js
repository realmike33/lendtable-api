module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testURL: 'http://localhost/',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  moduleFileExtensions: ['js', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  restoreMocks: true,
}

export {}
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    "\\.(png)$": "<rootDir>/src/__mocks__/fileMock.js",
  }
};
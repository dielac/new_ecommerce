// jest.config.cjs
/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",

  // 1. Only look inside "src" for test files, ignoring any nested package.json collisions:
  roots: ["<rootDir>/src"],

  // 2. After loading the JSDOM environment, run this to pull in jest-dom matchers:
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // 3. Which files to consider “tests”:
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],

  // 4. Whenever Jest sees a CSS/SASS/LESS import, map it to identity-obj-proxy:
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },

  // 5. Transform TS/TSX via ts-jest (default from preset), leave node_modules alone:
  transformIgnorePatterns: ["/node_modules/"],
};

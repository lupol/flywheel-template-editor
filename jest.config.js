/* eslint-env node */

module.exports = {
  testEnvironment: "jsdom",
  rootDir: ".",
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  transform: {
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  //   transformIgnorePatterns: ["<rootDir>/node_modules/(!vue2-google-maps)"],
  moduleNameMapper: {
    "^@/([/A-Za-z0-9\\-_.@]*)$": "<rootDir>/src/$1",
    "^tests/(.*)$": "<rootDir>/tests/$1",
    "^common/(.*)$": "<rootDir>/src/components/common/$1",
    "^ui/(.*)$": "<rootDir>/src/components/common/ui/$1",
    "^logger$": "<rootDir>/src/modules/observability/logger/jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/file-mock.js",
    "\\.(css|less)$": "<rootDir>/tests/mocks/file-mock.js",
  },
  // eslint-disable-next-line regex/invalid
  testEnvironmentOptions: { url: "http://localhost/" },
  coverageDirectory: "./coverage/",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/public/"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  //   setupFiles: ['<rootDir>/tests/setup-jest.ts', '<rootDir>/src/modules/catalog/jest-setup.ts'],
  setupFilesAfterEnv: [
    "jest-extended/all",
    "@testing-library/jest-dom",
    "@testing-library/jest-dom/extend-expect",
    // '<rootDir>/tests/setup-vuex-utils.ts',
  ],
  testMatch: ["<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/public/"],
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!**/*.spec.*.{js,ts}",
    "!**/{public}/**",
    "!**/{node_modules,tests}/**",
  ],
  //   globalSetup: '<rootDir>/tests/global-setup.ts',
  // parallelise tests in CI
  testSequencer: require.resolve("@split-tests/jest"),
};

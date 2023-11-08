const esmPackages = ["promise-polyfill"];
const config = {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testMatch: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esmPackages.join("|")})/)`],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/mocks/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/src/mocks/styleMock.js",
  },
  setupFiles: ["./jest.polyfills.js"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  globalSetup: "<rootDir>/src/__tests__/setupEnv.ts",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
        module: {
          type: "commonjs",
        },
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};

module.exports = config;

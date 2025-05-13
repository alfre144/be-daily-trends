import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/tests/**/*.test.ts"
  ],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/presentation/index.ts",
    "!src/presentation/server.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
};

export default config;
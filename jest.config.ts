import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  roots: ['./src/tests'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  collectCoverage: true,
  testEnvironment: 'node',
  reporters: ['default'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
}

export default jestConfig

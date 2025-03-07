module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  collectCoverageFrom: ['src/domain/use-cases/**/*.{ts,tsx}'],
};

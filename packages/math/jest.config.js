module.exports = {
  collectCoverage: true,
  coverageDirectory: './coverage/',
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  }
};

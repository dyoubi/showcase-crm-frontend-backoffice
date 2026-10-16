module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/libs/jest/jest-config/voidTransformer.js',
    '\\.(css|less)$': '<rootDir>/src/libs/jest/jest-config/voidTransformer.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!uuid)/'],
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.ts',
    '@testing-library/jest-dom/extend-expect',
  ],
};

module.exports = (wallaby) => ({
  bootstrap(wallaby) {
    wallaby.testFramework.configure({
      moduleNameMapper: {
        '.*\.(css|less)$': require('path').resolve(wallaby.localProjectDir, 'node_modules/jest-css-modules')
      },
    });
  },

  debug: true,

  env: {
    type: 'node',

    params: {
      env: 'NODE_ENV="test"',
    },
  },

  hints: {
    ignoreCoverage: /istanbul ignore next/,
  },

  files: [
    'tsconfig.json',
    'src/**/*.ts?(x)',
  ],

  preprocessors: {
    '**/*.js?(x)': (file) => {
      const babelCore = require('babel-core');
      return babelCore.transform(file.content, {
        filename:  file.path,
        presets:   [ 'babel-preset-jest', ],
        sourceMap: true,
      });
    },
  },

  testFramework: 'jest',

  tests: [
    'tests/**/*.test.ts',
    'tests/**/*.test.ts?(x)',
  ],
});
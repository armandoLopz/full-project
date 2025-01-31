module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.(ts|tsx)$': [
        'ts-jest',
        {
          useESM: true,
          tsconfig: 'tsconfig.json'
        }
      ],
      '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^vuetify/components$': '<rootDir>/node_modules/vuetify/lib/components',
      '^vuetify/directives$': '<rootDir>/node_modules/vuetify/lib/directives'
    },
    testEnvironmentOptions: {
      customExportConditions: ['node', 'node-addons'],
    },
    setupFilesAfterEnv: ['<rootDir>/src/tests/unit/jest.setup.ts'],
    transformIgnorePatterns: [
      'node_modules/(?!(vuetify|@vue|vue-router)/)'
    ],
    testMatch: [
      '<rootDir>/src/tests/unit/**/*.spec.ts'
    ],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json'
      }
    }
  };
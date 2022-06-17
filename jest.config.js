// const iOS = require('jest-expo/ios/jest-preset')
// const android = require('jest-expo/android/jest-preset')

const baseConfig = {
  
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './babel-jest.config.js' }]
  },
  transformIgnorePatterns: [
    "/node_modules/@react-native-async-storage/async-storage/(?!(lib))",
    'node_modules/(?!(jest-)?@react-native|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/'
    
  ],
  // setupFiles: ['./jestSetup.js'],
  setupFilesAfterEnv: ['./jestSetup.js']
  
}


module.exports = {
  projects: [
    {
      "preset": "jest-expo",
      ...baseConfig
    }
    // {
    //   // ...android,
    //   preset:'react-native',
    //   ...baseConfig
    //   // , setupFiles: ['./jestSetup.js']
    // },
    // {
    //   displayName: 'Web',
    //   preset: 'react-native-web',
    //   // This is brittle, we did this so snapshot naming/modifying is consistent
    //   snapshotResolver: 'jest-expo/src/snapshot/resolver.web.js',
    //   ...baseConfig
    //   // , setupFiles: ['./jestSetup.js']
    // }
  ],
}
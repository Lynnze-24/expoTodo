module.exports = function babelJestConfig (api) {
    api.cache(true)
    return {
      presets: ['@babel/preset-env', 'babel-preset-expo'],
      plugins: [
        '@babel/plugin-transform-runtime',
        "@babel/plugin-transform-flow-strip-types",
        "@babel/plugin-proposal-class-properties"
       
      ]
    }
  }
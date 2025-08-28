module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [ 'react-native-reanimated/plugin', 
          'react-native-worklets/plugin',
          '@babel/plugin-proposal-export-namespace-from',

  ]
};

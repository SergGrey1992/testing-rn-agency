module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          app: './src/app',
          processes: './src/processes',
          pages: './src/pages',
          widgets: './src/widgets',
          features: './src/features',
          entities: './src/entities',
          shared: './src/shared',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

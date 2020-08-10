const path = require('path');

module.exports = {
  mode: 'development',
  entry: {cube: './src/cube.js',
          icosahedron: './src/icosahedron.js',
          torusknot: './src/torusknot.js',
          tutorial: './src/tutorial.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
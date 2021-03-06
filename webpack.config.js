const path = require('path')
const fs = require('fs')

const nodeModules = fs.readdirSync('app/node_modules').filter((dep) => {
  return dep !== '.bin'
})

nodeModules.splice(0, 0, 'fs')

module.exports = {
  entry: path.join(__dirname, 'app/js/index.jsx'),
  output: {
    path: path.join(__dirname, 'app/bundle'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: function(context, request, cb) {
    if (nodeModules.indexOf(request) !== -1) {
      cb(null, 'commonjs ' + request)
      return
    }
    cb()
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        }
      },
    ]
  },
}

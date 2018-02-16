const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Identity'
    }),
    new GoogleFontsPlugin({
			fonts: [
				{ family: "Montserrat" },
			]
		}),
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
	]
}

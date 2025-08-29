import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import path from "node:path";

export default {
  entry: {
    app: "./src/index.ts"
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.riot'],
    // Webpack 5 drops Node polyfills. Uncomment only if you import Node core modules.
    // fallback: {
    //   path: require.resolve('path-browserify'),
    //   buffer: require.resolve('buffer/'),
    //   process: require.resolve('process/browser'),
    // },
  },
  externals: {
    url: "url",
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-module-source-map',
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      { 
        test: /\.ts$/,
        exclude: /node_modules/, 
        use: { 
          loader: 'ts-loader', 
          options: { 
            transpileOnly: true 
          }
        } 
      },
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@riotjs/webpack-loader",
            options: {
              hot: true,
              riot: {
                // keep default template
                // parse JS with TypeScript
                parser: { js: 'typescript' }
              }
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: ''
        }
      ]
    })
  ]
};

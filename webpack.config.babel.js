import path from 'path';

const PATHS = {
  app: path.join(__dirname, 'src/app/app.js'),
  build: path.join(__dirname, 'build')
};

const commonConfig = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  }
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only'
    }
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports = (env) => {
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();
};
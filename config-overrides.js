module.exports = function override(config, env) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: (config.module.rules || []).concat({
        test: /node_modules/,
        loader: "ify-loader"
      })
    }
  };
};
